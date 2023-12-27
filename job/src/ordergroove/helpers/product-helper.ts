import { ProductProjection, ProductVariant, ProductProjectionPagedQueryResponse, ProductVariantAvailability, Image, ScopedPrice } from '@commercetools/platform-sdk';

import { logger } from '../../utils/logger.utils';
import { addDecimalPointToCentAmount } from '../utils/data-utils';
import { OrdergrooveProduct } from '../../types/custom.types';

const LANGUAGE_CODE = process.env.CTP_LANGUAGE_CODE as string;
const INVENTORY_SUPPLY_CHANNEL_ID = process.env.CTP_INVENTORY_SUPPLY_CHANNEL_ID ?? '';

/**
 * Converts a ProductProjectionPagedQueryResponse in a list of products for ordergroove.
 * Applies business rules to pick the right price and inventory.
 * @param productProjectionPagedQueryResponse 
 * @returns List of OrdergrooveProduct
 */
export const convertProductProjectionToOrdergrooveProducts = async (productProjectionPagedQueryResponse: ProductProjectionPagedQueryResponse): Promise<OrdergrooveProduct[]> => {
  let variantsResult = new Array<OrdergrooveProduct>;

  try {
    const results: Array<ProductProjection> =  Object.values(productProjectionPagedQueryResponse.results);

    for (let i = 0; i < results.length; i++) {
      const result: ProductProjection = results[i];
      const productName = result.name[LANGUAGE_CODE];

      const masterVariantSku = result.masterVariant.sku === undefined ? '' : result.masterVariant.sku;

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
        variantsResult.push(ogProduct);
      }

      const variants: Array<ProductVariant> =  Object.values(result.variants);
      for (let x = 0; x < variants.length; x++) {
        const variant = variants[x];
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
          variantsResult.push(ogProduct);
        }
      }
    }
    logger.info(`Extracted ${variantsResult.length} valid product variants from commercetools.`);
  } catch (error) {
    logger.error('Error during the process convertProductProjectionToOrdergrooveProducts().', error);
  }

  return variantsResult;
}

function getScopedPrice(scopedPrice?: ScopedPrice): number | undefined {
  let result = undefined;

  if (scopedPrice !== undefined) {
    result = addDecimalPointToCentAmount(scopedPrice.currentValue.centAmount, scopedPrice.currentValue.fractionDigits);
  }

  return result;
}

function getInvalidPriceMessage(sku: string) {
  return `The product with SKU ${sku} does not have an embedded price for the given configuration in the connector, so it will not be created in ordergroove.`
}

function isProductOnStock(productAvailability?: ProductVariantAvailability): boolean {
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