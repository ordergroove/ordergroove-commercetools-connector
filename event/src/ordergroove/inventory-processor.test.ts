import { jest } from '@jest/globals'

import { processInventoryEntryEvent } from './inventory-processor'
import * as InventoryEntryProcessor from './inventory-processor'
import * as OgProductsApi from './client/og-products-api'
import * as CtService from './services/ct-service'
import { logger } from '../utils/logger.utils'
import * as ConfigUtils from '../utils/config.utils'
import {
  mockInventoryEntryDeletedEventPayload,
  mockOgProductApiResponse,
  mockProductVariantOutOfStock
} from './mocks/mocks'

jest.mock('../utils/config.utils', () => ({
  readConfiguration: jest.fn().mockReturnValue({
    region: 'test-region',
    projectKey: 'test-project',
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
    scope: undefined,
    languageCode: 'en-US',
    currencyCode: 'USD',
    countryCode: 'US',
    distributionChannelId: '12345',
    inventorySupplyChannelId: '12345',
    ordergrooveApiUrl: 'https://api',
    ordergrooveApiKey: 'ordergrooveApiKey'
  }),
}))
jest.mock('./client/og-products-api', () => {
  return {
    retrieveOgProduct: jest.fn().mockReturnValue(
      {
        success: true,
        status: 200,
        product: {
          product_id: 'ABC123',
          sku: 'ABC123',
          name: 'Test Product',
          price: 100,
          live: true,
          image_url: 'https://image-url.com',
          detail_url: ''
        }
      }
    ),
    updateProducts: jest.fn().mockReturnValue(
      {
        success: true,
        status: 200
      }
    ),
  }
})

jest.mock('./services/ct-service', () => {
  return {
    getProductVariantBySku: jest.fn().mockReturnValue(
      {
        "id": 1,
        "sku": "WFJM",
        "prices": [
          {
            "id": "12345",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 399,
              "fractionDigits": 2
            },
            "country": "US"
          }
        ],
        "images": [
          {
            "url": "https://image.com",
            "dimensions": {
              "w": 5056,
              "h": 4784
            }
          }
        ],
        "attributes": [],
        "assets": [],
        "availability": {
          "isOnStock": false,
          "availableQuantity": 0
        }
      }
    )
  }
})
jest.mock('../utils/logger.utils', () => ({
  logger: {
    info: jest.fn().mockReturnValue(''),
    error: jest.fn().mockReturnValue(''),
  },
}))

describe('processInventoryEntryEvent', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should update the live attribute in ordergroove', async () => {
    jest.spyOn(ConfigUtils, 'readConfiguration').mockReturnValue(
      {
        region: 'test-region',
        projectKey: 'test-project',
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret',
        scope: 'test-scope',
        languageCode: 'en-US',
        currencyCode: 'USD',
        countryCode: 'US',
        distributionChannelId: '12345',
        inventorySupplyChannelId: '12345',
        ordergrooveApiUrl: 'https://api',
        ordergrooveApiKey: 'ordergrooveApiKey'
      }
    )

    const processInventoryEntryEventSpy = jest
      .spyOn(InventoryEntryProcessor, 'processInventoryEntryEvent')

    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    const getProductVariantBySkuSpy = jest
      .spyOn(CtService, 'getProductVariantBySku')
      .mockImplementation(() => Promise.resolve(mockProductVariantOutOfStock))
      .mockResolvedValue(mockProductVariantOutOfStock)

    const updateProductsSpy = jest
      .spyOn(OgProductsApi, 'updateProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processInventoryEntryEvent(mockInventoryEntryDeletedEventPayload)

    expect(processInventoryEntryEventSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(getProductVariantBySkuSpy).toHaveBeenCalled()
    expect(updateProductsSpy).toHaveBeenCalled()
  })

  it('should not update the live attribute in ordergroove', async () => {
    const processInventoryEntryEventSpy = jest
      .spyOn(InventoryEntryProcessor, 'processInventoryEntryEvent')

    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    const getProductVariantBySkuSpy = jest
      .spyOn(CtService, 'getProductVariantBySku')
      .mockImplementation(() => Promise.resolve(mockProductVariantOutOfStock))
      .mockResolvedValue(mockProductVariantOutOfStock)

    const updateProductsSpy = jest
      .spyOn(OgProductsApi, 'updateProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processInventoryEntryEvent(mockInventoryEntryDeletedEventPayload)

    expect(processInventoryEntryEventSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(getProductVariantBySkuSpy).toHaveBeenCalled()
    expect(updateProductsSpy).toHaveBeenCalledTimes(0)
    expect(logger.info).toHaveBeenCalled()
  })

  it('should make a second attempt if the first update fails', async () => {
    jest.spyOn(ConfigUtils, 'readConfiguration').mockReturnValue(
      {
        region: 'test-region',
        projectKey: 'test-project',
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret',
        scope: 'test-scope',
        languageCode: 'en-US',
        currencyCode: 'USD',
        countryCode: 'US',
        distributionChannelId: '12345',
        inventorySupplyChannelId: '12345',
        ordergrooveApiUrl: 'https://api',
        ordergrooveApiKey: 'ordergrooveApiKey'
      }
    )

    const processInventoryEntryEventSpy = jest
      .spyOn(InventoryEntryProcessor, 'processInventoryEntryEvent')

    if (mockOgProductApiResponse.product !== undefined) {
      mockOgProductApiResponse.product.live = true;
    }
    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    
    const getProductVariantBySkuSpy = jest
      .spyOn(CtService, 'getProductVariantBySku')
      .mockImplementation(() => Promise.resolve(mockProductVariantOutOfStock))
      .mockResolvedValue(mockProductVariantOutOfStock)

    mockOgProductApiResponse.status = 500;
    mockOgProductApiResponse.success = false;
    const updateProductsSpy = jest
      .spyOn(OgProductsApi, 'updateProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processInventoryEntryEvent(mockInventoryEntryDeletedEventPayload)

    expect(processInventoryEntryEventSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(getProductVariantBySkuSpy).toHaveBeenCalled()
    expect(updateProductsSpy).toHaveBeenCalledTimes(2)
  })

  it('should not update the live attribute when sku is not defined in the event message', async () => {
    const processInventoryEntryEventSpy = jest
      .spyOn(InventoryEntryProcessor, 'processInventoryEntryEvent')

    mockInventoryEntryDeletedEventPayload.sku = undefined;
    await processInventoryEntryEvent(mockInventoryEntryDeletedEventPayload)

    expect(processInventoryEntryEventSpy).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalled()
  })

  it('should not update the live attribute when the product does not exists in ordergroove', async () => {
    const processInventoryEntryEventSpy = jest
      .spyOn(InventoryEntryProcessor, 'processInventoryEntryEvent')

    mockOgProductApiResponse.product = undefined;
    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processInventoryEntryEvent(mockInventoryEntryDeletedEventPayload)

    expect(processInventoryEntryEventSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalled()
  })
})