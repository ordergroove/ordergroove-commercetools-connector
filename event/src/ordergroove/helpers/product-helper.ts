import { ScopedPrice, Image, ProductVariantAvailability, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { logger } from '../../utils/logger.utils';
import { CtEventPayload, OrdergrooveProduct } from '../../types/custom.types';
import { addDecimalPointToCentAmount } from '../utils/data-utils';
import { getProductProjectionBySkuWithScopedPrice } from '../services/ct-service';
import { readConfiguration } from '../../utils/config.utils';

/**
 * Process the 'ProductPublished' event from commercetools and builds a list of products for ordergroove.
 * Applies business rules to pick the right price and inventory.
 * @param payload commercetools event payload
 * @returns List of OrdergrooveProduct
 */
export const convertProductPublishedPayloadToOrdergrooveProducts = async (payload: CtEventPayload): Promise<OrdergrooveProduct[]> => {
  let ordergrooveProducts = new Array<OrdergrooveProduct>;

  try {
    const masterVariantSku = payload.productProjection?.masterVariant.sku === undefined ?
      '' : payload.productProjection?.masterVariant.sku;

    const productProjection: ProductProjectionPagedQueryResponse = await getProductProjectionBySkuWithScopedPrice(masterVariantSku);

    for (let result of productProjection.results) {
      const productName: string = result.name[readConfiguration().languageCode];

      if (productName === undefined) {
        logger.info(`The product with ID ${result.id} does not have a name for the language code specified (${readConfiguration().languageCode}), so it will not be updated/created in ordergroove.`)
        break;
      }
      
      const masterVariantPrice = getScopedPrice(result.masterVariant.scopedPrice);

      if (masterVariantPrice === undefined) {
        logger.info(getInvalidPriceMessage(masterVariantSku));
      } else {
        let ogProduct: OrdergrooveProduct = {
          product_id: masterVariantSku,
          sku: masterVariantSku,
          name: productName,
          price: masterVariantPrice,
          live: isProductOnStock(result.masterVariant.availability),
          image_url: getImageUrl(result.masterVariant.images),
          detail_url: ''
        };
        ordergrooveProducts.push(ogProduct);
      }

      for (let variant of result.variants) {
        const variantSku = variant.sku === undefined ? '' : variant.sku;

        const variantPrice = getScopedPrice(variant.scopedPrice);

        if (variantPrice === undefined) {
          logger.info(getInvalidPriceMessage(variantSku));
        } else {
          let ogProduct: OrdergrooveProduct = {
            product_id: variantSku,
            sku: variantSku,
            name: productName,
            price: variantPrice,
            live: isProductOnStock(variant.availability),
            image_url: getImageUrl(variant.images, result.masterVariant.images),
            detail_url: ''
          };
          ordergrooveProducts.push(ogProduct);
        }
      }

    }
  } catch (error) {
    logger.error('Error during the process convertProductPublishedPayloadToOrdergrooveProducts().', error);
  }

  return ordergrooveProducts;
}

function getScopedPrice(scopedPrice?: ScopedPrice): number | undefined {
  let result = undefined;

  if (scopedPrice !== undefined) {
    result = addDecimalPointToCentAmount(scopedPrice.currentValue.centAmount, scopedPrice.currentValue.fractionDigits);
  }

  return result;
}

function getInvalidPriceMessage(sku: string) {
  return `The product with SKU ${sku} does not have an embedded price for the given configuration in the connector, so it will not be updated/created in ordergroove.`
}

export const isProductOnStock = (productAvailability?: ProductVariantAvailability): boolean => {
  if (productAvailability === undefined) {
    return true;
  } else {
    const channels = productAvailability.channels;

    if (channels === undefined) {
      return productAvailability.isOnStock === undefined ? true : productAvailability.isOnStock;
    } else {
      if (readConfiguration().inventorySupplyChannelId !== '') {
        if (channels[readConfiguration().inventorySupplyChannelId] !== undefined) {
          const thisChannelHasStock = channels[readConfiguration().inventorySupplyChannelId].isOnStock;
          return thisChannelHasStock === undefined ? true : thisChannelHasStock;
        }
      }

      let valuesArray = Object.values(channels);

      let atLeastOneChannelHasStock: boolean = false;
      valuesArray.forEach(value => {
        if (value.isOnStock === true) {
          atLeastOneChannelHasStock = true;
          return;
        }
      });

      const isOnStockForAnyChannel = productAvailability.isOnStock;

      if (isOnStockForAnyChannel !== undefined) {
        return isOnStockForAnyChannel || atLeastOneChannelHasStock;
      } else {
        return atLeastOneChannelHasStock;
      }
    }
  }
}

function getImageUrl(productImages?: Image[], masterProductImages?: Image[]): string {
  let result = productImages !== undefined && productImages.length > 0 ? productImages[0].url : '';

  if (result === '' && masterProductImages !== undefined && masterProductImages.length > 0) {
    result = masterProductImages[0].url;
  }

  return result;
}