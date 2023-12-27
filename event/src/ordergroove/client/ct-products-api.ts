import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { createApiRoot } from '../../client/create.client';
import { GetFunction } from '../../types/index.types';

export const productProjectionsSearch: GetFunction<ProductProjectionPagedQueryResponse> = async (queryArgs) => {
  const { body } = await createApiRoot().productProjections().search().get({ queryArgs }).execute();

  return body;
};