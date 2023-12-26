import { Request, Response } from 'express';

import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { CtEventPayload } from '../types/custom.types';
import { processProductPublishedEvent } from '../ordergroove/product-published-processor';
import { EventType, InventoryMode } from '../ordergroove/utils/event-config';
import { processInventoryEntryEvent } from '../ordergroove/inventory-processor';
import { processOrderCreatedEvent } from '../ordergroove/order-created-processor';

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (request: Request, response: Response) => {
  try {
    // Check request body
    if (!request.body) {
      logger.error('Missing request body.');
      throw new CustomError(400, 'Bad request: No Pub/Sub message was received');
    }

    // Check if the body comes in a message
    if (!request.body.message) {
      logger.error('Missing body message');
      throw new CustomError(400, 'Bad request: Wrong No Pub/Sub message format');
    }

    const payload: CtEventPayload = JSON.parse(
      Buffer.from(request.body.message.data, 'base64').toString('utf8').trim()
    );

    logger.info('Event received, request.body.message.data decoded:' + JSON.stringify(payload));

    const type = payload.type;
    const inventoryMode = payload.order?.inventoryMode;
    if (type === EventType.ProductPublished) {
      await processProductPublishedEvent(payload);
    } else if (type === EventType.InventoryEntryCreated ||
        type === EventType.InventoryEntryQuantitySet ||
        type === EventType.InventoryEntryDeleted) {
      await processInventoryEntryEvent(payload);
    } else if (type === EventType.OrderCreated &&
        (inventoryMode === InventoryMode.ReserveOnOrder || inventoryMode === InventoryMode.TrackOnly)) {
      await processOrderCreatedEvent(payload);
    }

    // Return the response for the client
    response.status(200).send();
  } catch (error) {
    logger.info(`Event message error: ${(error as Error).message}`);
    response.status(400);
    response.send();
  }
};
