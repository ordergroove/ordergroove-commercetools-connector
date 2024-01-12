import { logger } from '../../utils/logger.utils';
import { OrdergrooveProduct, OrdergrooveApiResponse } from '../../types/custom.types';
import { readConfiguration } from '../../utils/config.utils';

const headers = {
  'x-api-key': readConfiguration().ordergrooveApiKey,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};
const maxRetries = 2;

// Makes a second try if the first request fails
export const createProducts = async (products: Array<OrdergrooveProduct>, executionId: string, attemptCount?: number): Promise<OrdergrooveApiResponse> => {
  let result: OrdergrooveApiResponse = {
    success: false,
    status: 0
  };

  try {
    attemptCount = attemptCount === undefined ? 0 : attemptCount;

    if (attemptCount < maxRetries) {

      logger.info(`[${executionId}] Starting the process of creating products in ordergroove: ${JSON.stringify(products)}`);

      await fetch(`${readConfiguration().ordergrooveApiUrl}/products-batch/create/?force_all_fields=false`, {
        method: 'POST',
        body: JSON.stringify(products),
        headers
      })
        .then((response) => {
          result.status = response.status;

          if (response.ok) {
            result.success = true;
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

  return result;
}