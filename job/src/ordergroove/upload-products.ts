import { logger } from '../utils/logger.utils';
import { getProductProjections } from './client/ct-products-api';
import { convertProductProjectionToOrdergrooveProducts } from './helpers/product-helper';
import { createProducts } from './client/og-products-api';
import { OrdergrooveProduct } from '../types/custom.types';
import { createUUID } from './utils/data-utils'
import { QueryArgs } from '../types/index.types';
import { readConfiguration } from '../utils/config.utils';
import { setInitialProductLoadExecuted } from './helpers/custom-objects-helper';

export const uploadProducts = async (limitQuery: number, offsetQuery: number, executeNext?: boolean, totalProductVariants?: number): Promise<boolean> => {
  try {
    const queryArgs: QueryArgs = getQueryArgs(limitQuery, offsetQuery);
    logger.info(`Get product-projections from commercetools, queryArgs: ${JSON.stringify(queryArgs)}`);

    executeNext = executeNext as boolean ?? true;
    totalProductVariants = totalProductVariants as number ?? 0;

    if (executeNext) {
      const productProjectionPagedQueryResponse = await getProductProjections(queryArgs);
      const { count, offset } = productProjectionPagedQueryResponse;
      const total = productProjectionPagedQueryResponse.total as number ?? 0;

      const allProductVariants: OrdergrooveProduct[] =
        await convertProductProjectionToOrdergrooveProducts(productProjectionPagedQueryResponse);

      totalProductVariants = totalProductVariants + allProductVariants.length;

      await sendProductsToOrdergroove(allProductVariants);

      const totalProductsRequested = offset + count;
      logger.info(`Products retrieved from commercetools: ${totalProductsRequested} of a total of ${total}`);

      const productVariantsLimit = parseInt(readConfiguration().productVariantsLimit);

      if (totalProductsRequested < total && totalProductVariants < productVariantsLimit) {
        offsetQuery = offsetQuery + 100;
        await uploadProducts(limitQuery, offsetQuery, true, totalProductVariants);
      } else {
        await updateProductLoadStatus();
        logger.info(`>> The products upload process from commercetools to ordergroove has finished with a total of ${totalProductVariants} valid product variants processed <<`);
      }
    }
  } catch (error) {
    logger.error('Error at uploading products', error);
  }

  return true;
}

function getQueryArgs(limitQuery: number, offsetQuery: number): QueryArgs {
  let queryArgs: QueryArgs = {};
  queryArgs.limit = limitQuery;
  queryArgs.offset = offsetQuery;
  queryArgs.priceCurrency = readConfiguration().currencyCode;

  if (readConfiguration().countryCode !== '') {
    queryArgs.priceCountry = readConfiguration().countryCode;
  }

  if (readConfiguration().distributionChannelId !== '') {
    queryArgs.priceChannel = readConfiguration().distributionChannelId;
  }

  return queryArgs;
}

async function sendProductsToOrdergroove(products: Array<OrdergrooveProduct>) {
  const numberOfBatches = Math.ceil((products.length / 100));
  logger.info(`Preparing ${numberOfBatches} batches for sending to ordergroove`);

  // limit to 10 batches/second (Requests are throttled at 600req/min)
  if (numberOfBatches <= 10) {
    await setPromiseAllToSendBatches(products, numberOfBatches, 0);
  } else {
    const numberOfPromisesAll = Math.ceil((numberOfBatches / 10));

    let startIndex = 0;
    let numberOfBatchesToSend = 10;
    let numberOfBatchesLeft = numberOfBatches;
    for (let i = 0; i < numberOfPromisesAll; i++) {
      if (numberOfBatchesLeft > 10) {
        await setPromiseAllToSendBatches(products, numberOfBatchesToSend, 0);
        numberOfBatchesLeft = numberOfBatchesLeft - numberOfBatchesToSend;
        startIndex = startIndex + 1000;
      } else {
        await setPromiseAllToSendBatches(products, numberOfBatchesLeft, startIndex);
      }
    }
  }
}

async function setPromiseAllToSendBatches(products: Array<OrdergrooveProduct>, numberOfBatches: number, startIndex: number) {
  const batchesList = new Array();
  let finishIndex = startIndex + 100;
  for (let x = 0; x < numberOfBatches; x++) {
    batchesList.push(products.slice(startIndex, finishIndex));
    startIndex = finishIndex;
    finishIndex = finishIndex + 100;
  }

  logger.info(`Setting up promise.all to send ${numberOfBatches} batches of products to ordergroove`);
  await Promise.all(
    batchesList.map(async batch => {
      createProducts(batch, createUUID());
    })
  );
}

async function updateProductLoadStatus() {
  const response = await setInitialProductLoadExecuted();

  // retry one time
  if (!response) {
    await setInitialProductLoadExecuted();
  }
}