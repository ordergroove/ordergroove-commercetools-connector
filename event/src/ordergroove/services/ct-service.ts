import { ProductVariant, ProductProjectionPagedQueryResponse, ProductProjection } from '@commercetools/platform-sdk';

import { productProjectionsSearch } from '../client/ct-products-api';
import { QueryArgs } from '../../types/index.types';
import { readConfiguration } from '../../utils/config.utils';

/**
 * Executes a Produc Projection Search by sku.
 * @param sku of the product variant
 * @returns The ProductVariant of the sku given.
 */
export const getProductVariantBySku = async (sku: string): Promise<ProductVariant> => {
  try {
    let queryArgs: QueryArgs = {};
    queryArgs.filter = `variants.sku:\"${sku}\"`;

    const productProjection: ProductProjectionPagedQueryResponse =
      await productProjectionsSearch(queryArgs);
    
    const productVariant = extractVariantFromResults(sku, productProjection.results);

    if (productVariant === undefined) {
      throw new Error(`Product variant undefined.`);
    }

    return productVariant;
  } catch (error: any) {
    throw new Error(`Error during the process getProductVariantBySku(${sku}): ${error.message}`);
  }
}

/**
 * Executes a Product Projection Search by sku with scoped price.
 * @param sku of the master variant or any variant of the product to retrieve.
 * @returns ProductProjectionPagedQueryResponse
 */
export const getProductProjectionBySkuWithScopedPrice = async (sku: string): Promise<ProductProjectionPagedQueryResponse> => {
  try {
    let queryArgs = getQueryArgsForScopedPrice();
    queryArgs.filter = `variants.sku:\"${sku}\"`;

    return await productProjectionsSearch(queryArgs);
  } catch (error: any) {
    throw new Error(`Error during the process getProductProjectionBySkuWithScopedPrice(${sku}): ${error.message}`);
  }
}

function getQueryArgsForScopedPrice(): QueryArgs {
  let queryArgs: QueryArgs = {};
  queryArgs.priceCurrency = readConfiguration().currencyCode;

  if (readConfiguration().countryCode !== '') {
    queryArgs.priceCountry = readConfiguration().countryCode;
  }

  if (readConfiguration().distributionChannelId !== '') {
    queryArgs.priceChannel = readConfiguration().distributionChannelId;
  }

  return queryArgs;
}

function extractVariantFromResults(sku: string, results: ProductProjection[]): ProductVariant | undefined {
  let productVariant: ProductVariant | undefined;

  for (let result of results) {
    let masterVariantSku = result.masterVariant.sku === undefined ? '' : result.masterVariant.sku;
    if (sku === masterVariantSku) {
      productVariant = result.masterVariant;
      break;
    } else {
      for (let variant of result.variants) {
        let variantSku = variant.sku === undefined ? '' : variant.sku;
        if (sku === variantSku) {
          productVariant = variant;
          break;
        }
      }
    }
  }

  return productVariant;
}