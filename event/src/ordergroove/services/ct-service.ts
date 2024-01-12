import { ProductVariant, ProductProjectionPagedQueryResponse, ProductProjection, QueryParam } from '@commercetools/platform-sdk';

import { getProductProjections } from '../client/ct-products-api';
import { QueryArgs } from '../../types/index.types';
import { readConfiguration } from '../../utils/config.utils';

/**
 * Executes a Produc Projection Query by sku.
 * @param sku of the product variant
 * @returns The ProductVariant of the sku given.
 */
export const getProductVariantBySku = async (sku: string): Promise<ProductVariant> => {
  try {
    let queryArgs: QueryArgs = {
      'var.skus': sku
    };
    queryArgs.where = 'masterVariant(sku in :skus) or variants(sku in :skus)';

    const productProjection: ProductProjectionPagedQueryResponse =
      await getProductProjections(queryArgs);
    
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
 * Executes a Product Projection Query by sku with price selection.
 * @param sku of the product variant
 * @returns ProductProjectionPagedQueryResponse
 */
export const getProductProjectionBySkuWithPriceSelection = async (sku: string): Promise<ProductProjectionPagedQueryResponse> => {
  try {
    let queryArgs: QueryArgs = {
      'var.skus': sku
    };
    queryArgs.where = 'masterVariant(sku in :skus) or variants(sku in :skus)';
    queryArgs = getQueryArgsForPriceSelection(queryArgs);

    return await getProductProjections(queryArgs);
  } catch (error: any) {
    throw new Error(`Error during the process getProductProjectionBySkuWithPriceSelection(${sku}): ${error.message}`);
  }
}

function getQueryArgsForPriceSelection(queryArgs: QueryArgs): QueryArgs {
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