import { logger } from '../utils/logger.utils';
import { getProductProjections } from './client/ct-products-api';
import { convertProductProjectionToOrdergrooveProducts } from './helpers/product-helper';
import { createProducts } from './client/og-products-api';
import { OrdergrooveProduct } from '../types/custom.types';
import { createUUID } from './utils/data-utils'
import { QueryArgs } from '../types/index.types';
import { readConfiguration } from '../utils/config.utils';
import { setJobStatus, Status } from './helpers/custom-objects-helper';

const limit = 100;

export const uploadProducts =
    async (offset: number, executeNext?: boolean, totalProductsRequested?: number, totalProductVariants?: number): Promise<boolean> => {
  try {
    executeNext = executeNext as boolean ?? true;
    totalProductsRequested = totalProductsRequested as number ?? 0;
    totalProductVariants = totalProductVariants as number ?? 0;

    const queryArgs: QueryArgs = getQueryArgs(offset);
    logger.info(`Get product-projections from commercetools, queryArgs: ${JSON.stringify(queryArgs)}`);

    if (executeNext) {
      const productProjections = await getProductProjections(queryArgs);
      const { count } = productProjections;

      totalProductsRequested = totalProductsRequested + productProjections.results.length;
      logger.info(`Amount of products retrieved from commercetools until this point: ${totalProductsRequested}`);

      const allProductVariants: OrdergrooveProduct[] =
        await convertProductProjectionToOrdergrooveProducts(productProjections);

      totalProductVariants = totalProductVariants + allProductVariants.length;

      await sendProductsToOrdergroove(allProductVariants);
      if (limit === count) {
        offset = offset + 100;

        await updateJobStatus(offset, Status.ACTIVE);
        await uploadProducts(offset, true, totalProductsRequested, totalProductVariants);
      } else {
        await updateJobStatus(offset, Status.COMPLETED);
        logger.info(`>> The products upload process from commercetools to ordergroove has finished with a total of ${totalProductVariants} valid product variants processed <<`);
      }
    }
  } catch (error) {
    logger.error('Error at uploading products', error);
  }

  return true;
}

function getQueryArgs(offset: number): QueryArgs {
  const queryArgs: QueryArgs = {};

  queryArgs.withTotal = false;
  queryArgs.limit = limit;
  queryArgs.offset = offset;
  queryArgs.sort = 'createdAt asc';

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
    const numberOfBatchesToSend = 10;
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
  const batchesList = [];
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

async function updateJobStatus(offset: number, status: string) {
  const response = await setJobStatus(offset, status);

  // retry one time
  if (!response) {
    await setJobStatus(offset, status);
  }
}