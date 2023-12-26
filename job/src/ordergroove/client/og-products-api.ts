import { logger } from '../../utils/logger.utils';
import { OrdergrooveProduct } from '../../types/custom.types';
import { createUUID } from '../utils/data-utils';

const url = "https://staging.restapi.ordergroove.com/products-batch/create/?force_all_fields=false";
const headers = {
  'x-api-key': process.env.OG_API_KEY as string,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};
const maxRetries = 2;

// Makes a second try if the first request fails
export const createProducts = async (products: Array<OrdergrooveProduct>, executionId: string, attemptCount?: number ) => {
  try {
    attemptCount = attemptCount === undefined ? 0 : attemptCount;

    if (attemptCount < maxRetries) {

      logger.info(`[${executionId}] Starting the process of creating products in ordergroove: ${JSON.stringify(products)}`);

      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(products),
        headers
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          throw new Error(`status ${response.status}`);
        })
        .then((data) => {
          logger.info(`[${executionId}] Response during the process of creating products in ordergroove: ${JSON.stringify(data)}`);
        })
        .catch((error) => {
          logger.error(`[${executionId}] Error ocurred during the process of creating products in ordergroove.`, error);
          attemptCount = attemptCount === undefined ? 1 : attemptCount++;
          setTimeout(() => createProducts(products, executionId, attemptCount), 1000);
        });
    }
  } catch (error) {
    logger.error(`[${executionId}] Error ocurred during the process of creating products in ordergroove.`, error);
  }
}