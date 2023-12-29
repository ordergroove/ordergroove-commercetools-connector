import dotenv from 'dotenv';
dotenv.config();

import { createApiRoot } from '../client/create.client';
import { assertError } from '../utils/assert.utils';
import { deleteOrdergrooveConnectorSubscription } from './actions';

export async function preUndeploy(): Promise<void> {
  const apiRoot = createApiRoot();
  await deleteOrdergrooveConnectorSubscription(apiRoot);
}

export async function run(): Promise<void> {
  try {
    await preUndeploy();
  } catch (error) {
    assertError(error);
    process.stderr.write(`Post-undeploy failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}

run();
