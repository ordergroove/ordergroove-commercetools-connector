import { ProductVariant, ScopedPrice, Image, ProductVariantAvailability, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { logger } from '../../utils/logger.utils';
import { CtEventPayload, OrdergrooveProduct } from '../../types/custom.types';
import { addDecimalPointToCentAmount } from '../utils/data-utils';
import { getProductProjectionBySkuWithScopedPrice } from '../services/ct-service';

const LANGUAGE_CODE = process.env.CTP_LANGUAGE_CODE as string;
const INVENTORY_SUPPLY_CHANNEL_ID = process.env.CTP_INVENTORY_SUPPLY_CHANNEL_ID ?? '';

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
      const productName: string = result.name[LANGUAGE_CODE];
      
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
  return `The product with SKU ${sku} does not have an embedded price for the given configuration in the connector, so it will not be updated in ordergroove.`
}

export const isProductOnStock = (productAvailability?: ProductVariantAvailability): boolean => {
  let result = false;

  if (productAvailability === undefined) {
    result = true;
  } else {
    const channels = productAvailability.channels;

    let atLeastOneChannelHasStock = false;
    if (channels !== undefined) {
      let valuesArray = Object.values(channels);

      valuesArray.forEach(value => {
        if (value.isOnStock === true) {
          atLeastOneChannelHasStock = true;
          return;
        }
      });
    }

    const masterVariantIsOnStockForAnyChannel = productAvailability.isOnStock;

    if (masterVariantIsOnStockForAnyChannel !== undefined) {
      result = masterVariantIsOnStockForAnyChannel || atLeastOneChannelHasStock;
    } else {
      result = atLeastOneChannelHasStock;
    }
  }

  return result;
}

function getImageUrl(productImages?: Image[], masterProductImages?: Image[]): string {
  let result = productImages !== undefined && productImages.length > 0 ? productImages[0].url : '';

  if (result === '' && masterProductImages !== undefined && masterProductImages.length > 0) {
    result = masterProductImages[0].url;
  }

  return result;
}