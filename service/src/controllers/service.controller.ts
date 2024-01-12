import { Request, Response } from 'express';
import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { uploadProducts } from '../ordergroove/upload-products';

/**
 * Exposed service endpoint.
 * - Receives a POST request, if the query parameter 'startUpload' is set to true,
 * it initiates the product upload from commercetools to ordergroove.
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (request: Request, response: Response) => {
  try {
    let executeInitialUpload: boolean = request.query.startUpload === undefined
      ? false : request.query.startUpload === 'true' ? true : false;

    if (executeInitialUpload) {
      logger.info('>> Starting the initial products load from commercetools to ordergroove <<');
      await uploadProducts(100, 0);
      response.send({ message: 'Product load finished, check the deployment logs for more information.' });
    } else {
      // Test service app timeout
      for (let i = 1; i <= 30; i++) {
        console.log(`----->>>>> Waiting ${i}`);
        await sleep(60000);
      }

      response
        .send({
          message: 'The query parameter startUpload is not included in the URL or is not set to true; as a result, the process was not executed.'
        });
    }
  } catch (error) {
    throw new CustomError(
      500,
      `Internal Server Error - Error uploading products to ordergroove, check the deployment logs for more information`
    );
  }
};

const sleep = async (milliseconds: number) => {
  await new Promise(resolve => {
    return setTimeout(resolve, milliseconds)
  });
};
