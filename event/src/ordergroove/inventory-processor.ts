import { ProductVariant } from '@commercetools/platform-sdk';

import { logger } from '../utils/logger.utils';
import { CtEventPayload, OrdergrooveProduct, OrdergrooveApiResponse } from '../types/custom.types';
import { createUUID } from './utils/data-utils';
import { retrieveOgProduct, updateProducts } from './client/og-products-api';
import { getProductVariantBySku } from './services/ct-service';
import { isProductOnStock } from './helpers/stock-helper';

export const processInventoryEntryEvent = async (payload: CtEventPayload): Promise<boolean> => {
  const execution_id = createUUID();

  try {
    const sku = payload.resourceUserProvidedIdentifiers?.sku as string ?? '';

    if (sku === '') {
      throw new Error(`Couldn't get the product sku asociated with this event: ${JSON.stringify(payload)}`);
    } else {
      const ogProductResponse: OrdergrooveApiResponse = await retrieveOgProduct(sku, execution_id);
      const ogProduct: OrdergrooveProduct | undefined = ogProductResponse.product;

      if (ogProduct === undefined) {
        logger.info(`[${execution_id}] An error occurred processing the ${payload.type} event, the product with sku ${sku} does not exist in ordergroove.`);
      } else {
        await updateProductOnOrdergroove(sku, ogProduct, execution_id);
      }
    }
  } catch (error) {
    logger.error(`[${execution_id}] An error occurred while processing the ${payload.type} event:`, error);
  }

  return true;
}

async function updateProductOnOrdergroove(sku: string, ogProduct: OrdergrooveProduct, execution_id: string) {
  const ctProductVariant: ProductVariant = await getProductVariantBySku(sku);
  const isCtProductOnStock = isProductOnStock(ctProductVariant.availability);

  if (ogProduct.live !== isCtProductOnStock) {
    ogProduct.live = isCtProductOnStock;
    const updProducts = new Array();
    updProducts.push(ogProduct);
    const ogUpdateResponse: OrdergrooveApiResponse = await updateProducts(updProducts, execution_id);

    if (!ogUpdateResponse.success && ogUpdateResponse.status === 500) {
      await updateProducts(updProducts, execution_id);
    }
  } else {
    logger.info(`[${execution_id}] The inventory of the product with sku ${sku} does not need an update in ordergroove.`);
  }
}