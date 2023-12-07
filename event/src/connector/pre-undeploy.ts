import dotenv from 'dotenv';
dotenv.config();

import { createApiRoot } from '../client/create.client';
import { assertError } from '../utils/assert.utils';
import {
  deleteInventoryEntrySubscription,
  deleteOrderCreatedSubscription,
  deleteProductPublishedSubscription
} from './actions';

async function preUndeploy(): Promise<void> {
  const apiRoot = createApiRoot();
  await deleteInventoryEntrySubscription(apiRoot);
  await deleteOrderCreatedSubscription(apiRoot);
  await deleteProductPublishedSubscription(apiRoot);
}

async function run(): Promise<void> {
  try {
    await preUndeploy();
  } catch (error) {
    assertError(error);
    process.stderr.write(`Post-undeploy failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}

run();
