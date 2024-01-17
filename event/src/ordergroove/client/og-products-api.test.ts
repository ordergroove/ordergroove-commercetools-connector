import * as ConfigUtils from '../../utils/config.utils'
import { retrieveOgProduct, createProducts, updateProducts } from './og-products-api'
import * as OgProductsApi from './og-products-api'
import { mockOgProductApiResponse, mockOgProduct, mockOgProducts } from '../mocks/mocks'

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

describe('retrieveOgProduct', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should get a product from ordergroove successfully', async () => {
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
    const responseBody = {
      "merchant": "aaaaa",
      "groups": [],
      "name": "Product name",
      "price": "16.99",
      "image_url": "https://img.jpg",
      "detail_url": "https://detail/url",
      "external_product_id": "11111",
      "sku": "11111",
      "autoship_enabled": false,
      "premier_enabled": 0,
      "created": "2018-07-24 10:06:10",
      "last_update": "2018-11-20 10:48:00",
      "live": false,
      "discontinued": false,
      "offer_profile": null,
      "extra_data": null,
      "incentive_group": null,
      "product_type": "standard",
      "autoship_by_default": false,
      "every": 2,
      "every_period": 2
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        body: responseBody,
        status: 200,
        ok: true,
        json: () => Promise.resolve(responseBody)
      }),
    ) as jest.Mock;

    const result = await retrieveOgProduct('11111', 'qwe123')

    expect(result.success).toBe(true)
    expect(result.product?.product_id).toBe('11111')
  })

  it('should return an error when the retrieve request returns an error', async () => {
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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        body: {},
        status: 500,
        ok: false,
        json: () => Promise.resolve({})
      }),
    ) as jest.Mock;

    const result = await retrieveOgProduct('11111', 'qwe123')

    expect(result.success).toBe(false)
  })

  it('should handle an error from fetch function when the retrieve request is called', async () => {
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
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => { throw new Error('connection error') });

    const result = await retrieveOgProduct('11111', 'qwe123')

    expect(global.fetch).toThrow('connection error')
    expect(result.success).toBe(false)
    expect(result.status).toBe(0)
  })
})

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
        ordergrooveApiUrl: 'https://api',
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

    const result = await createProducts(mockOgProducts, 'qwe123')

    expect(result.success).toBe(true)
  })

  it('should return an error when the create request returns an error', async () => {
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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        body: {},
        status: 500,
        ok: false,
        json: () => Promise.resolve({})
      }),
    ) as jest.Mock;

    const result = await createProducts(mockOgProducts, 'qwe123')

    expect(result.success).toBe(false)
  })

  it('should handle an error from fetch function when the create request is called', async () => {
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
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => { throw new Error('connection error') });

    const result = await createProducts(mockOgProducts, 'qwe123')

    expect(global.fetch).toThrow('connection error')
    expect(result.success).toBe(false)
    expect(result.status).toBe(0)
  })
})

describe('updateProducts', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should update a product in ordergroove successfully', async () => {
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

    const result = await updateProducts(mockOgProducts, 'qwe123')

    expect(result.success).toBe(true)
  })

  it('should return an error when the update request returns an error', async () => {
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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        body: {},
        status: 500,
        ok: false,
        json: () => Promise.resolve({})
      }),
    ) as jest.Mock;

    const result = await updateProducts(mockOgProducts, 'qwe123')

    expect(result.success).toBe(false)
  })

  it('should handle an error from fetch function when the update request is called', async () => {
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
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => { throw new Error('connection error') });

    const result = await updateProducts(mockOgProducts, 'qwe123')

    expect(global.fetch).toThrow('connection error')
    expect(result.success).toBe(false)
    expect(result.status).toBe(0)
  })
})