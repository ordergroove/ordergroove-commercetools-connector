import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { createApiRoot } from '../../client/create.client';
import { GetFunction } from '../../types/index.types';

export const productProjectionsSearch: GetFunction<ProductProjectionPagedQueryResponse> = async (queryArgs) => {
  await sleep(10000); // Wait for the changes to propagate in ct

  const { body } = await createApiRoot().productProjections().search().get({ queryArgs }).execute();

  return body;
};

const sleep = async (milliseconds: number) => {
  await new Promise(resolve => {
    return setTimeout(resolve, milliseconds)
  });
};