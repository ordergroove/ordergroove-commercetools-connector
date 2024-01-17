import { Request, Response } from 'express';

import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { uploadProducts } from '../ordergroove/upload-products';
import { isInitialProductLoadExecutable } from '../ordergroove/helpers/custom-objects-helper';

/**
 * Exposed job endpoint.
 *
 * @param {Request} _request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (_request: Request, response: Response) => {
  try {
    const executeLoad = await isInitialProductLoadExecutable();

    let responseMessage = '';
    if (executeLoad) {
      logger.info('>> Starting the initial products load from commercetools to ordergroove <<');
      await uploadProducts(100, 0);
      responseMessage = 'Product load finished, check the deployment logs for more information.'
    } else {
      responseMessage = 'This product load will not be executed, check the deployment logs for more information.'
    }

    response.status(200).send({ message: responseMessage });
  } catch (error) {
    console.log(error);
    throw new CustomError(
      500,
      `Internal Server Error - Error uploading products to ordergroove, check the deployment logs for more information`
    );
  }
};
