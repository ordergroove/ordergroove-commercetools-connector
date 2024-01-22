import { CustomObjectDraft } from '@commercetools/platform-sdk';

import * as CtCustomObjectsApi from '../client/ct-custom-objects-api';
import { logger } from '../../utils/logger.utils';
import { JobStatus } from '../../types/custom.types';

const OG_CONTAINER = 'Ordergroove';
const INITIAL_PRODUCT_LOAD_STATUS_SCHEMA_KEY = 'JobStatusSchema';

export const Status = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED"
}

/**
 * Gets the current Job Status.
 * @returns JobStatus object
 */
export const getJobStatus = async (): Promise<JobStatus> => {
  const result = {} as JobStatus;

  try {
    const customObject = await CtCustomObjectsApi.getCustomObjectByContainerAndKey(
      OG_CONTAINER, INITIAL_PRODUCT_LOAD_STATUS_SCHEMA_KEY
    );

    result.currentOffset = customObject.body.value['currentOffset'];
    result.status = customObject.body.value['status'];
    result.thisCustomObjectExists = true;
  } catch (error) {
    const errorJson = JSON.parse(JSON.stringify(error));
    const statusCode: number = errorJson['statusCode'] ?? 0;

    if (statusCode === 404) {
      result.thisCustomObjectExists = false;
      logger.info(`Response of getting a custom object, container ${OG_CONTAINER} and key ${INITIAL_PRODUCT_LOAD_STATUS_SCHEMA_KEY}:`, error);
    } else {
      throw new Error('Error at getJobStatus() function: ' + errorJson);
    }
  }

  return result;
}

/**
 * Creates the custom object that stores the status of the initial product load process.
 * @param status string ACTIVE or COMPLETED
 * @param currentOffset number specifying the last offset set in the Product Projections Query
 * @returns boolean Indicates if the creation of the custom object was successful.
 */
export const setJobStatus = async (currentOffset: number, status: string): Promise<boolean> => {
  let result = false;

  try {
    const jobStatusSchemaObject: CustomObjectDraft = {
      container: OG_CONTAINER,
      key: INITIAL_PRODUCT_LOAD_STATUS_SCHEMA_KEY,
      value: {
        "currentOffset": currentOffset,
        "status": status
      }
    }

    await CtCustomObjectsApi.createCustomObject(jobStatusSchemaObject);
    result = true;
  } catch (error) {
    logger.error('Error at setJobStatus() function:', error);
  }

  return result;
}