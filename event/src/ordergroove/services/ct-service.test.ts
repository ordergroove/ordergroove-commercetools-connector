import * as CtService from './ct-service'
import * as CtProductsApi from '../client/ct-products-api'
import * as ConfigUtils from '../../utils/config.utils'
import { getProductVariantBySku, getProductProjectionBySkuWithPriceSelection } from './ct-service'
import { mockProductProjectionPagedQueryResponse } from '../mocks/mocks'

jest.mock('../../utils/config.utils', () => ({
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
    ordergrooveApiKey: 'ordergrooveApiKey',
    productStoreUrl: 'https://product/detail/[SLUG]'
  }),
}))
jest.mock('@commercetools/platform-sdk')
jest.mock('../client/ct-products-api')

describe('getProductVariantBySku', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call the commercetools product projections API and get a product (variant) filtered by sku', async () => {
    const getProductVariantBySkuSpy = jest
      .spyOn(CtService, 'getProductVariantBySku')

    const getProductProjectionsSpy = jest
      .spyOn(CtProductsApi, 'getProductProjections')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponse))
      .mockResolvedValue(mockProductProjectionPagedQueryResponse)

    const result = await getProductVariantBySku('WFJM')

    expect(getProductVariantBySkuSpy).toHaveBeenCalled()
    expect(getProductProjectionsSpy).toHaveBeenCalled()
    expect(result.sku).toBe('WFJM')
  })

  it('should call the commercetools product projections API and get a product (master) filtered by sku', async () => {
    const getProductVariantBySkuSpy = jest
      .spyOn(CtService, 'getProductVariantBySku')

    const getProductProjectionsSpy = jest
      .spyOn(CtProductsApi, 'getProductProjections')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponse))
      .mockResolvedValue(mockProductProjectionPagedQueryResponse)

    const result = await getProductVariantBySku('WFJS')

    expect(getProductVariantBySkuSpy).toHaveBeenCalled()
    expect(getProductProjectionsSpy).toHaveBeenCalled()
    expect(result.sku).toBe('WFJS')
  })

  it('should call the commercetools product projections API and throw an error when the product variant is undefined', async () => {
    jest.spyOn(CtProductsApi, 'getProductProjections')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponse))
      .mockResolvedValue(mockProductProjectionPagedQueryResponse)

    expect(async () => {
      await getProductVariantBySku('AAAA');
    }).rejects.toThrow();
  })
})

describe('getProductProjectionBySkuWithPriceSelection', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call the commercetools product projections API and get a product filtered by sku with price selection: currencyCode', async () => {
    jest.spyOn(ConfigUtils, 'readConfiguration').mockReturnValue(
      {
        region: 'test-region',
        projectKey: 'test-project',
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret',
        scope: 'test-scope',
        languageCode: 'en-US',
        currencyCode: 'USD',
        countryCode: '',
        distributionChannelId: '',
        inventorySupplyChannelId: '',
        ordergrooveApiUrl: 'https://api',
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )

    const getProductProjectionBySkuWithPriceSelectionSpy = jest
      .spyOn(CtService, 'getProductProjectionBySkuWithPriceSelection')

    const getProductProjectionsSpy = jest
      .spyOn(CtProductsApi, 'getProductProjections')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponse))
      .mockResolvedValue(mockProductProjectionPagedQueryResponse)

    await getProductProjectionBySkuWithPriceSelection('WFJM')

    expect(getProductProjectionBySkuWithPriceSelectionSpy).toHaveBeenCalled()
    expect(getProductProjectionsSpy).toHaveBeenCalled()
  })

  it('should handle an error from ProductProjections', async () => {
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

    jest.spyOn(CtProductsApi, 'getProductProjections')
      .mockRejectedValue(() => Promise.resolve(mockProductProjectionPagedQueryResponse))

    expect(async () => {
      await getProductProjectionBySkuWithPriceSelection('WFJM');
    }).rejects.toThrow();
  })
})