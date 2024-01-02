import { processOrderCreatedEvent } from './order-created-processor'
import * as OrderCreatedProcessor from './order-created-processor'
import * as OgProductsApi from './client/og-products-api'
import * as CtService from './services/ct-service'
import * as ConfigUtils from '../utils/config.utils'
import { logger } from '../utils/logger.utils'
import {
  mockOrderCreatedEventPayload,
  mockOrderCreatedEventPayloadWithLineItemsEmpty,
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

describe('processOrderCreatedEvent', () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey'
      }
    )

    const processOrderCreatedEventSpy = jest
      .spyOn(OrderCreatedProcessor, 'processOrderCreatedEvent')

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

    await processOrderCreatedEvent(mockOrderCreatedEventPayload)

    expect(processOrderCreatedEventSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(updateProductsSpy).toHaveBeenCalled()
  })

  it('should not update the live attribute in ordergroove', async () => {
    const processOrderCreatedEventSpy = jest
      .spyOn(OrderCreatedProcessor, 'processOrderCreatedEvent')

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

    await processOrderCreatedEvent(mockOrderCreatedEventPayload)

    expect(processOrderCreatedEventSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(updateProductsSpy).toHaveBeenCalledTimes(0)
  })

  it('should make a second attempt when the first update fails', async () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey'
      }
    )

    const processOrderCreatedEventSpy = jest
      .spyOn(OrderCreatedProcessor, 'processOrderCreatedEvent')

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

    mockOgProductApiResponse.success = false;
    mockOgProductApiResponse.status = 500;
    const updateProductsSpy = jest
      .spyOn(OgProductsApi, 'updateProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processOrderCreatedEvent(mockOrderCreatedEventPayload)

    expect(processOrderCreatedEventSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(getProductVariantBySkuSpy).toHaveBeenCalled()
    expect(updateProductsSpy).toHaveBeenCalledTimes(2)
  })

  it('should write a log when the product in the order does not exists in ordergroove', async () => {
    const processOrderCreatedEventSpy = jest
      .spyOn(OrderCreatedProcessor, 'processOrderCreatedEvent')

    mockOgProductApiResponse.product = undefined;
    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processOrderCreatedEvent(mockOrderCreatedEventPayload)

    expect(processOrderCreatedEventSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalled()
  })

  it('should write a log when there are no line items in the order', async () => {
    const processOrderCreatedEventSpy = jest
      .spyOn(OrderCreatedProcessor, 'processOrderCreatedEvent')
    
    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processOrderCreatedEvent(mockOrderCreatedEventPayloadWithLineItemsEmpty)

    expect(processOrderCreatedEventSpy).toHaveBeenCalled()
    expect(logger.error).toHaveBeenCalled()
  })
})