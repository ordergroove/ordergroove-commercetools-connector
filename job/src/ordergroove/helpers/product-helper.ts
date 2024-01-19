import {
  ProductProjection, ProductProjectionPagedQueryResponse,
  Image, Price, LocalizedString
} from '@commercetools/platform-sdk';

import { logger } from '../../utils/logger.utils';
import { addDecimalPointToCentAmount } from '../utils/data-utils';
import { OrdergrooveProduct } from '../../types/custom.types';
import { readConfiguration } from '../../utils/config.utils';
import { isProductOnStock } from './stock-helper';

/**
 * Converts a ProductProjectionPagedQueryResponse in a list of products for ordergroove.
 * Applies business rules to pick the right price and inventory.
 * @param productProjectionPagedQueryResponse 
 * @returns List of OrdergrooveProduct
 */
export const convertProductProjectionToOrdergrooveProducts = async (productProjection: ProductProjectionPagedQueryResponse): Promise<OrdergrooveProduct[]> => {
  let variantsResult = new Array<OrdergrooveProduct>;

  try {
    for (let result of productProjection.results) {
      const productName = result.name[readConfiguration().languageCode];

      if (productName === undefined) {
        logger.info(`The product with ID ${result.id} does not have a name for the language code specified (${readConfiguration().languageCode}), so it will not be updated/created in ordergroove.`)
        break;
      }

      const ogProductMasterVariant = buildOgProductFromMasterVariant(result, productName);
      if (ogProductMasterVariant !== undefined) {
        variantsResult.push(ogProductMasterVariant);
      }

      variantsResult.push(...buildOgProductsFromVariants(result, productName));
    }
  } catch (error) {
    logger.error('Error during the process convertProductProjectionToOrdergrooveProducts().', error);
  }

  return variantsResult;
}

function buildOgProductFromMasterVariant(result: ProductProjection, productName: string): OrdergrooveProduct | undefined {
  let ogProduct = undefined;
  const masterVariantSku = result.masterVariant.sku as string ?? '';
  const masterVariantPrice = getPrice(result.masterVariant.price);

  if (masterVariantPrice === undefined) {
    logger.info(getInvalidPriceMessage(masterVariantSku));
  } else {
    ogProduct = {
      product_id: masterVariantSku,
      sku: masterVariantSku,
      name: productName,
      price: masterVariantPrice,
      live: isProductOnStock(result.masterVariant.availability),
      image_url: getImageUrl(result.masterVariant.images),
      detail_url: getDetailUrl(result.slug)
    } as OrdergrooveProduct;
  }

  return ogProduct;
}

function buildOgProductsFromVariants(result: ProductProjection, productName: string): OrdergrooveProduct[] {
  const ogProducts = new Array<OrdergrooveProduct>;

  for (let variant of result.variants) {
    const variantSku = variant.sku as string ?? '';

    const variantPrice = getPrice(variant.price);

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
        detail_url: getDetailUrl(result.slug)
      };
      ogProducts.push(ogProduct);
    }
  }

  return ogProducts;
}

function getPrice(price?: Price): number | undefined {
  let result = undefined;

  if (price !== undefined) {
    result = addDecimalPointToCentAmount(price.value.centAmount, price.value.fractionDigits);
  }

  return result;
}

function getInvalidPriceMessage(sku: string) {
  return `The product with SKU ${sku} does not have an embedded price for the given configuration in the connector, so it will not be created in ordergroove.`
}

function getImageUrl(productImages?: Image[], masterProductImages?: Image[]): string {
  let result = productImages !== undefined && productImages.length > 0 ? productImages[0].url : '';

  if (result === '' && masterProductImages !== undefined && masterProductImages.length > 0) {
    result = masterProductImages[0].url;
  }

  return result;
}

function getDetailUrl(slug: LocalizedString): string {
  let result = '';

  const productUrl = readConfiguration().productStoreUrl;

  if (productUrl !== '') {
    const localizedSlug = slug[readConfiguration().languageCode] ?? '';
    if (localizedSlug !== '') {
      result = productUrl.replace('[SLUG]', localizedSlug);
    }
  }

  return result;
}