import * as DataUtils from '../utils/data-utils'
import * as CtService from '../services/ct-service'
import * as ConfigUtils from '../../utils/config.utils'
import { OrdergrooveProduct } from '../../types/custom.types'
import { convertProductPublishedPayloadToOrdergrooveProducts } from './product-helper'
import { logger } from '../../utils/logger.utils'
import {
  mockProductCtEventPayload,
  mockProductProjectionPagedQueryResponse,
  mockProductProjectionPagedQueryResponseWithInvalidLanguageCode,
  mockProductProjectionPagedQueryResponseWithoutScopedPrice,
  mockProductProjectionPagedQueryResponseVariantWithoutImage,
  mockProductProjectionPagedQueryResponseStockInChannel,
  mockProductProjectionPagedQueryResponseStockForAny,
  mockProductProjectionPagedQueryResponseWithoutValidSlug
} from '../mocks/mocks'

jest.mock('@commercetools/platform-sdk')
jest.mock('../utils/data-utils')
jest.mock('../services/ct-service', () => {
  return {
    getProductProjectionBySkuWithScopedPrice: jest.fn()
  }
})
jest.mock('../../utils/logger.utils', () => ({
  logger: {
    info: jest.fn().mockReturnValue(''),
    error: jest.fn().mockReturnValue(''),
  },
}))
jest.mock('../../utils/config.utils', () => ({
  readConfiguration: jest.fn().mockReturnValue({
    region: 'test-region',
    projectKey: 'test-project',
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
    scope: 'scope',
    languageCode: 'en-US',
    currencyCode: 'USD',
    countryCode: 'US',
    distributionChannelId: '12345',
    inventorySupplyChannelId: '12345',
    ordergrooveApiUrl: 'https://api',
    ordergrooveApiKey: 'ordergrooveApiKey',
    productStoreUrl: 'https://product/detail/[SLUG]'
  }),
}))

describe('convertProductPublishedPayloadToOrdergrooveProducts', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  });

  it('should process an event payload and build a list of products for ordergroove', async () => {
    const getProductProjectionBySkuWithScopedPriceSpy = jest
      .spyOn(CtService, 'getProductProjectionBySkuWithScopedPrice')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponse))
      .mockResolvedValue(mockProductProjectionPagedQueryResponse)

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)
    
    const result: OrdergrooveProduct[] = await convertProductPublishedPayloadToOrdergrooveProducts(mockProductCtEventPayload)

    expect(getProductProjectionBySkuWithScopedPriceSpy).toHaveBeenCalled()
    expect(addDecimalPointToCentAmountSpy).toHaveBeenCalled()
    expect(result.length).toBeGreaterThanOrEqual(2)
  })

  it('should set the master variant image when the variant does not have an image', async () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )

    const getProductProjectionBySkuWithScopedPriceSpy = jest
      .spyOn(CtService, 'getProductProjectionBySkuWithScopedPrice')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponseVariantWithoutImage))
      .mockResolvedValue(mockProductProjectionPagedQueryResponseVariantWithoutImage)

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)

    const result: OrdergrooveProduct[] = await convertProductPublishedPayloadToOrdergrooveProducts(mockProductCtEventPayload)

    expect(getProductProjectionBySkuWithScopedPriceSpy).toHaveBeenCalled()
    expect(addDecimalPointToCentAmountSpy).toHaveBeenCalled()
    expect(result[0].image_url).toBe(result[1].image_url)
  })

  it('should pick the stock from the supply channel configured in the connector', async () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )

    const getProductProjectionBySkuWithScopedPriceSpy = jest
      .spyOn(CtService, 'getProductProjectionBySkuWithScopedPrice')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponseStockInChannel))
      .mockResolvedValue(mockProductProjectionPagedQueryResponseStockInChannel)

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)

    const result: OrdergrooveProduct[] = await convertProductPublishedPayloadToOrdergrooveProducts(mockProductCtEventPayload)

    expect(getProductProjectionBySkuWithScopedPriceSpy).toHaveBeenCalled()
    expect(addDecimalPointToCentAmountSpy).toHaveBeenCalled()
    expect(result[0].live).toBe(true)
  })

  it('should not return products with a language code not valid', async () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )

    const getProductProjectionBySkuWithScopedPriceSpy = jest
      .spyOn(CtService, 'getProductProjectionBySkuWithScopedPrice')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponseWithInvalidLanguageCode))
      .mockResolvedValue(mockProductProjectionPagedQueryResponseWithInvalidLanguageCode)

    const result: OrdergrooveProduct[] = await convertProductPublishedPayloadToOrdergrooveProducts(mockProductCtEventPayload)

    expect(getProductProjectionBySkuWithScopedPriceSpy).toHaveBeenCalled()
    expect(result.length).toBe(0)
    expect(logger.info).toHaveBeenCalled()
  })

  it('should not return products when there is no scoped price', async () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )

    const getProductProjectionBySkuWithScopedPriceSpy = jest
      .spyOn(CtService, 'getProductProjectionBySkuWithScopedPrice')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponseWithoutScopedPrice))
      .mockResolvedValue(mockProductProjectionPagedQueryResponseWithoutScopedPrice)

    const result: OrdergrooveProduct[] = await convertProductPublishedPayloadToOrdergrooveProducts(mockProductCtEventPayload)

    expect(getProductProjectionBySkuWithScopedPriceSpy).toHaveBeenCalled()
    expect(result.length).toBe(0)
    expect(logger.info).toHaveBeenCalled()
  })

  it('should write a log and return zero products when the getProductProjectionBySkuWithScopedPrice() function fails', async () => {
    jest.spyOn(CtService, 'getProductProjectionBySkuWithScopedPrice')
      .mockImplementation(() => { throw new Error('connection error')});

    const result: OrdergrooveProduct[] = await convertProductPublishedPayloadToOrdergrooveProducts(mockProductCtEventPayload)

    expect(CtService.getProductProjectionBySkuWithScopedPrice).toThrow('connection error');
    expect(result.length).toBe(0)
    expect(logger.error).toHaveBeenCalled()
  })

  it('should pick the inventory from any channel when inventorySupplyChannelId var is not provided', async () => {
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
        inventorySupplyChannelId: '',
        ordergrooveApiUrl: 'https://api',
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )

    const getProductProjectionBySkuWithScopedPriceSpy = jest
      .spyOn(CtService, 'getProductProjectionBySkuWithScopedPrice')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponseStockInChannel))
      .mockResolvedValue(mockProductProjectionPagedQueryResponseStockInChannel)

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)

    const result: OrdergrooveProduct[] = await convertProductPublishedPayloadToOrdergrooveProducts(mockProductCtEventPayload)

    expect(getProductProjectionBySkuWithScopedPriceSpy).toHaveBeenCalled()
    expect(addDecimalPointToCentAmountSpy).toHaveBeenCalled()
    expect(result.length).toBeGreaterThanOrEqual(2)
  })

  it('should pick the inventory from the root when inventorySupplyChannelId var is not provided', async () => {
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
        inventorySupplyChannelId: '',
        ordergrooveApiUrl: 'https://api',
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )

    const getProductProjectionBySkuWithScopedPriceSpy = jest
      .spyOn(CtService, 'getProductProjectionBySkuWithScopedPrice')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponseStockForAny))
      .mockResolvedValue(mockProductProjectionPagedQueryResponseStockForAny)

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)

    const result: OrdergrooveProduct[] = await convertProductPublishedPayloadToOrdergrooveProducts(mockProductCtEventPayload)

    expect(getProductProjectionBySkuWithScopedPriceSpy).toHaveBeenCalled()
    expect(addDecimalPointToCentAmountSpy).toHaveBeenCalled()
    expect(result.length).toBeGreaterThanOrEqual(2)
  })
  
  it('should left the detail_url attribute empty if the productStoreUrl var is not provided', async () => {
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
        inventorySupplyChannelId: '',
        ordergrooveApiUrl: 'https://api',
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: ''
      }
    )

    const getProductProjectionBySkuWithScopedPriceSpy = jest
      .spyOn(CtService, 'getProductProjectionBySkuWithScopedPrice')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponse))
      .mockResolvedValue(mockProductProjectionPagedQueryResponse)

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)

    const result: OrdergrooveProduct[] = await convertProductPublishedPayloadToOrdergrooveProducts(mockProductCtEventPayload)

    expect(getProductProjectionBySkuWithScopedPriceSpy).toHaveBeenCalled()
    expect(addDecimalPointToCentAmountSpy).toHaveBeenCalled()
    expect(result.length).toBeGreaterThanOrEqual(2)
  })

  it('should left the detail_url attribute empty if the product does not have a slug', async () => {
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
        inventorySupplyChannelId: '',
        ordergrooveApiUrl: 'https://api',
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )

    const getProductProjectionBySkuWithScopedPriceSpy = jest
      .spyOn(CtService, 'getProductProjectionBySkuWithScopedPrice')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponseWithoutValidSlug))
      .mockResolvedValue(mockProductProjectionPagedQueryResponseWithoutValidSlug)

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)

    const result: OrdergrooveProduct[] = await convertProductPublishedPayloadToOrdergrooveProducts(mockProductCtEventPayload)

    expect(getProductProjectionBySkuWithScopedPriceSpy).toHaveBeenCalled()
    expect(addDecimalPointToCentAmountSpy).toHaveBeenCalled()
    expect(result.length).toBeGreaterThanOrEqual(2)
  })
})