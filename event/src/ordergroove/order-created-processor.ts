import { ProductVariant } from '@commercetools/platform-sdk';

import { logger } from '../utils/logger.utils';
import { CtEventPayload, OrdergrooveProduct, OrdergrooveApiResponse } from '../types/custom.types';
import { retrieveOgProduct, updateProducts } from './client/og-products-api';
import { getProductVariantBySku } from './services/ct-service';
import { createUUID } from './utils/data-utils';
import { isProductOnStock } from './helpers/stock-helper';

export const processOrderCreatedEvent = async (payload: CtEventPayload): Promise<boolean> => {

  try {
    const lineItems = payload.order?.lineItems === undefined ? new Array() : payload.order?.lineItems;

    if (lineItems.length === 0) {
      throw new Error(`The order with id ${payload.order?.id} does not have lineItems, therefore it does not have an effect on the inventory in ordergroove.`);
    } else {
      for (const lineItem of lineItems) {
        const execution_id = createUUID();
        const sku = lineItem.variant.sku;

        const ogProductResponse: OrdergrooveApiResponse = await retrieveOgProduct(sku, execution_id);
        const ogProduct: OrdergrooveProduct | undefined = ogProductResponse.product;

        if (ogProduct === undefined) {
          logger.info(`[${execution_id}] An error occurred processing the order with id ${payload.order?.id}, the product with sku ${sku} does not exist in ordergroove.`);
        } else {
          const ctProductVariant: ProductVariant = await getProductVariantBySku(sku);

          await updateProductOnOrdergroove(ogProduct, ctProductVariant, execution_id);
        }
      }
    }
  } catch (error) {
    logger.error('Error processing the event received (OrderCreated).', error);
  }

  return true;
}

async function updateProductOnOrdergroove(ogProduct: OrdergrooveProduct, ctProductVariant: ProductVariant, execution_id: string) {
  const isCtProductOnStock = isProductOnStock(ctProductVariant.availability);

  if (ogProduct.live !== isCtProductOnStock) {
    ogProduct.live = isCtProductOnStock;
    const updProducts = new Array();
    updProducts.push(ogProduct);
    const ogUpdateResponse: OrdergrooveApiResponse = await updateProducts(updProducts, execution_id);

    // Retry one more time
    if (!ogUpdateResponse.success && ogUpdateResponse.status === 500) {
      await updateProducts(updProducts, execution_id);
    }
  } else {
    logger.info(`[${execution_id}] The inventory of the product with sku ${ctProductVariant.sku} does not need an update in ordergroove.`);
  }
}