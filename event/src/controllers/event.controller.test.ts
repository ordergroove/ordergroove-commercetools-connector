import { Request, Response } from 'express'

import { post } from './event.controller'
import * as InventoryProcessor from '../ordergroove/inventory-processor'
import * as ProductPublishedProcessor from '../ordergroove/product-published-processor'
import * as OrderCreatedProcessor from '../ordergroove/order-created-processor'

jest.mock('../ordergroove/inventory-processor', () => {
  return {
    processInventoryEntryEvent: jest.fn()
  }
})
jest.mock('../ordergroove/product-published-processor', () => {
  return {
    processProductPublishedEvent: jest.fn()
  }
})
jest.mock('../ordergroove/order-created-processor', () => {
  return {
    processOrderCreatedEvent: jest.fn()
  }
})

describe('post function', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  beforeEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    mockRequest = {}
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
  })

  it('should handle ProductPublished type correctly', async () => {
    const fakeData = {
      type: 'ProductPublished',
      productProjection: {
        key: 'some-key',
        name: { 'en-US': 'Some Product Name' },
        description: { 'en-US': 'Some Product Description' },
        variants: [],
        masterVariant: { sku: 'some-sku' },
      },
    }

    let buff = Buffer.from(JSON.stringify(fakeData));
    let base64data = buff.toString('base64');

    mockRequest.body = { message: { data: base64data } };

    const processProductPublishedEventSpy = jest
      .spyOn(ProductPublishedProcessor, 'processProductPublishedEvent')

    await post(mockRequest as Request, mockResponse as Response)

    expect(processProductPublishedEventSpy).toHaveBeenCalled()
  })

  it('should handle InventoryEntryQuantitySet type correctly', async () => {
    const fakeData = {
      type: 'InventoryEntryQuantitySet',
      productProjection: {
        key: 'some-key',
        name: { 'en-US': 'Some Product Name' },
        description: { 'en-US': 'Some Product Description' },
        variants: [],
        masterVariant: { sku: 'some-sku' },
      },
    }

    let buff = Buffer.from(JSON.stringify(fakeData));
    let base64data = buff.toString('base64');

    mockRequest.body = { message: { data: base64data } };

    const processInventoryEntryEventSpy = jest
      .spyOn(InventoryProcessor, 'processInventoryEntryEvent')

    await post(mockRequest as Request, mockResponse as Response)

    expect(processInventoryEntryEventSpy).toHaveBeenCalled()
  })

  it('should handle InventoryEntryCreated type correctly', async () => {
    const fakeData = {
      type: 'InventoryEntryCreated',
      productProjection: {
        key: 'some-key',
        name: { 'en-US': 'Some Product Name' },
        description: { 'en-US': 'Some Product Description' },
        variants: [],
        masterVariant: { sku: 'some-sku' },
      },
    }

    let buff = Buffer.from(JSON.stringify(fakeData));
    let base64data = buff.toString('base64');

    mockRequest.body = { message: { data: base64data } };

    const processInventoryEntryEventSpy = jest
      .spyOn(InventoryProcessor, 'processInventoryEntryEvent')

    await post(mockRequest as Request, mockResponse as Response)

    expect(processInventoryEntryEventSpy).toHaveBeenCalled()
  })

  it('should handle InventoryEntryDeleted type correctly', async () => {
    const fakeData = {
      type: 'InventoryEntryDeleted',
      productProjection: {
        key: 'some-key',
        name: { 'en-US': 'Some Product Name' },
        description: { 'en-US': 'Some Product Description' },
        variants: [],
        masterVariant: { sku: 'some-sku' },
      },
    }

    let buff = Buffer.from(JSON.stringify(fakeData));
    let base64data = buff.toString('base64');

    mockRequest.body = { message: { data: base64data } };

    const processInventoryEntryEventSpy = jest
      .spyOn(InventoryProcessor, 'processInventoryEntryEvent')

    await post(mockRequest as Request, mockResponse as Response)

    expect(processInventoryEntryEventSpy).toHaveBeenCalled()
  })

  it('should handle OrderCreated with inventory mode equals to ReserveOnOrder type correctly', async () => {
    const fakeData = {
      type: 'OrderCreated',
      order: {
        inventoryMode: "ReserveOnOrder"
      }
    }

    let buff = Buffer.from(JSON.stringify(fakeData));
    let base64data = buff.toString('base64');

    mockRequest.body = { message: { data: base64data } };

    const processOrderCreatedEventSpy = jest
      .spyOn(OrderCreatedProcessor, 'processOrderCreatedEvent')

    await post(mockRequest as Request, mockResponse as Response)

    expect(processOrderCreatedEventSpy).toHaveBeenCalled()
  })

  it('should handle OrderCreated with inventory mode equals to TrackOnly type correctly', async () => {
    const fakeData = {
      type: 'OrderCreated',
      order: {
        inventoryMode: "TrackOnly"
      }
    }

    let buff = Buffer.from(JSON.stringify(fakeData));
    let base64data = buff.toString('base64');

    mockRequest.body = { message: { data: base64data } };

    const processOrderCreatedEventSpy = jest
      .spyOn(OrderCreatedProcessor, 'processOrderCreatedEvent')

    await post(mockRequest as Request, mockResponse as Response)

    expect(processOrderCreatedEventSpy).toHaveBeenCalled()
  })

  it('should handle unknown type correctly', async () => {
    const fakeData = {
      type: 'UnknownType',
    };

    let buff = Buffer.from(JSON.stringify(fakeData));
    let base64data = buff.toString('base64');

    mockRequest.body = { message: { data: base64data } };

    await post(mockRequest as Request, mockResponse as Response);

    const processInventoryEntryEventSpy = jest
      .spyOn(InventoryProcessor, 'processInventoryEntryEvent')

    const processProductPublishedEventSpy = jest
      .spyOn(ProductPublishedProcessor, 'processProductPublishedEvent')

    expect(processInventoryEntryEventSpy).toHaveBeenCalledTimes(0)
    expect(processProductPublishedEventSpy).toHaveBeenCalledTimes(0)
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalled();
  })
})