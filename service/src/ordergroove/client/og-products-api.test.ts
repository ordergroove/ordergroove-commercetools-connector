import * as ConfigUtils from '../../utils/config.utils'
import { createProducts } from './og-products-api'
import { mockOgProducts } from '../mocks/mocks'

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
    ordergrooveApiKey: 'ordergrooveApiKey',
    productStoreUrl: 'https://product/detail/[SLUG]'
  }),
}))

describe('createProducts', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should create a product in ordergroove successfully', async () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )
    global.fetch = jest.fn(() =>
      Promise.resolve({
        body: {
          "results": [
            {
              "product_id": "ABC123",
              "status": 200
            }
          ]
        },
        status: 200,
        ok: true,
        json: () => Promise.resolve({
          "results": [
            {
              "product_id": "ABC123",
              "status": 200
            }
          ]
        })
      }),
    ) as jest.Mock;

    const result = await createProducts(mockOgProducts, '12345')

    expect(global.fetch).toHaveBeenCalled()
    expect(result.success).toBe(true)
    expect(result.status).toBe(200)
  })

  it('should make a second attempt if the first request fails', async () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )
    global.fetch = jest.fn(() =>
      Promise.resolve({
        body: { },
        status: 500,
        ok: false
      }),
    ) as jest.Mock;

    jest.useFakeTimers();
    const result = await createProducts(mockOgProducts, '12345')
    jest.runAllTimers();

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(result.success).toBe(false)
    expect(result.status).toBe(500)
  })

  it('should handle an error from fetch function', async () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => { throw new Error('connection error') });

    const result = await createProducts(mockOgProducts, '12345')

    expect(global.fetch).toThrow('connection error')
    expect(result.success).toBe(false)
    expect(result.status).toBe(0)
  })
})


