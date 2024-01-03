import * as DataUtils from '../utils/data-utils'
import * as ConfigUtils from '../../utils/config.utils'
import { convertProductProjectionToOrdergrooveProducts } from './product-helper'
import { OrdergrooveProduct } from '../../types/custom.types';
import { logger } from '../../utils/logger.utils'
import {
  mockProductProjectionPagedQueryResponse,
  mockProductProjectionPagedQueryResponseWithInvalidLanguageCode,
  mockProductProjectionPagedQueryResponseWithoutScopedPrice,
  mockProductProjectionPagedQueryResponseVariantWithoutImage,
  mockProductProjectionPagedQueryResponseStockInChannel,
  mockProductProjectionPagedQueryResponseStockForAny
} from '../mocks/mocks'

jest.mock('@commercetools/platform-sdk')
jest.mock('../utils/data-utils')
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
    ordergrooveApiUrl: process.env.OG_API_URL as string,
    ordergrooveApiKey: 'ordergrooveApiKey'
  }),
}))

describe('convertProductProjectionToOrdergrooveProducts', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should process an event payload and build a list of products for ordergroove', async () => {
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
        ordergrooveApiUrl: process.env.OG_API_URL as string,
        ordergrooveApiKey: 'ordergrooveApiKey'
      }
    )

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)

    const result: OrdergrooveProduct[] = await convertProductProjectionToOrdergrooveProducts(mockProductProjectionPagedQueryResponse)

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
        ordergrooveApiUrl: process.env.OG_API_URL as string,
        ordergrooveApiKey: 'ordergrooveApiKey'
      }
    )

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)

    const result: OrdergrooveProduct[] =
      await convertProductProjectionToOrdergrooveProducts(mockProductProjectionPagedQueryResponseVariantWithoutImage)

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
        ordergrooveApiUrl: process.env.OG_API_URL as string,
        ordergrooveApiKey: 'ordergrooveApiKey'
      }
    )

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)

    const result: OrdergrooveProduct[] =
      await convertProductProjectionToOrdergrooveProducts(mockProductProjectionPagedQueryResponseStockInChannel)

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
        ordergrooveApiUrl: process.env.OG_API_URL as string,
        ordergrooveApiKey: 'ordergrooveApiKey'
      }
    )

    const result: OrdergrooveProduct[] =
      await convertProductProjectionToOrdergrooveProducts(mockProductProjectionPagedQueryResponseWithInvalidLanguageCode)

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
        ordergrooveApiUrl: process.env.OG_API_URL as string,
        ordergrooveApiKey: 'ordergrooveApiKey'
      }
    )

    const result: OrdergrooveProduct[] =
      await convertProductProjectionToOrdergrooveProducts(mockProductProjectionPagedQueryResponseWithoutScopedPrice)

    expect(result.length).toBe(0)
    expect(logger.info).toHaveBeenCalled()
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
        ordergrooveApiUrl: process.env.OG_API_URL as string,
        ordergrooveApiKey: 'ordergrooveApiKey'
      }
    )

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)

    const result: OrdergrooveProduct[] =
      await convertProductProjectionToOrdergrooveProducts(mockProductProjectionPagedQueryResponseStockInChannel)

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
        ordergrooveApiUrl: process.env.OG_API_URL as string,
        ordergrooveApiKey: 'ordergrooveApiKey'
      }
    )

    const addDecimalPointToCentAmountSpy = jest
      .spyOn(DataUtils, 'addDecimalPointToCentAmount')
      .mockReturnValue(15.00)

    const result: OrdergrooveProduct[] =
      await convertProductProjectionToOrdergrooveProducts(mockProductProjectionPagedQueryResponseStockForAny)

    expect(addDecimalPointToCentAmountSpy).toHaveBeenCalled()
    expect(result.length).toBeGreaterThanOrEqual(2)
  })
})