import { CustomObjectDraft } from '@commercetools/platform-sdk';

import * as CtCustomObjectsApi from '../client/ct-custom-objects-api';
import { logger } from '../../utils/logger.utils';

export const OG_CONTAINER = 'Ordergroove';
export const INITIAL_PRODUCT_LOAD_STATUS_SCHEMA_KEY = 'initialProductLoadStatusSchema';

export const initialProductLoadStatusSchemaObject: CustomObjectDraft = {
  container: OG_CONTAINER,
  key: INITIAL_PRODUCT_LOAD_STATUS_SCHEMA_KEY,
  value: {
    "executed": true
  }
}

/**
 * Retrieve the custom object where the application stores the status of the initial product load and return true only if the object does not exist.
 * @returns boolean Indicates whether the process for the initial product load is executable.
 */
export const isInitialProductLoadExecutable = async (): Promise<boolean> => {
  let result = false;

  try {
    await CtCustomObjectsApi.getCustomObjectByContainerAndKey(
      OG_CONTAINER, INITIAL_PRODUCT_LOAD_STATUS_SCHEMA_KEY
    );
  } catch (error) {
    const errorJson = JSON.parse(JSON.stringify(error));
    const statusCode: number = errorJson['statusCode'] ?? 0;
    if (statusCode === 0) {
      logger.error('Error at shouldExecuteInitialProductLoad() function:', error);
    } else {
      result = statusCode === 404;
      logger.info(`Response for getting a custom object, container ${OG_CONTAINER} and key ${INITIAL_PRODUCT_LOAD_STATUS_SCHEMA_KEY}:`, error);
    }
  }

  return result;
}

/**
 * Creates the custom object that stores the status of the initial product load.
 * @returns boolean Indicates if the creation of the custom object was successful.
 */
export const setInitialProductLoadExecuted = async (): Promise<boolean> => {
  let result = false;

  try {
    await CtCustomObjectsApi.createCustomObject(initialProductLoadStatusSchemaObject);
    result = true;
  } catch (error) {
    logger.error('Error at setInitialProductLoadExecuted() function:', error);
  }

  return result;
}