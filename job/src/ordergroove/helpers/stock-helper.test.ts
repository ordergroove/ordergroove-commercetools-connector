import { ProductVariantAvailability } from '@commercetools/platform-sdk';
import * as ConfigUtils from '../../utils/config.utils'
import { isProductOnStock } from './stock-helper'

jest.mock('../../utils/config.utils')

describe('isProductOnStock', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should return true when the availability attribute is not defined', async () => {
    const mockAvailability: ProductVariantAvailability | undefined = undefined;

    const isOnStock = isProductOnStock(mockAvailability)

    expect(isOnStock).toBeTruthy()
  })

  it('should return true when the product has stock for any channel', async () => {
    const mockAvailability: ProductVariantAvailability = {
      "isOnStock": true,
      "availableQuantity": 73
    }

    const isOnStock = isProductOnStock(mockAvailability)

    expect(isOnStock).toBeTruthy()
  })

  it('should return false when the stock for any channel is zero', async () => {
    const mockAvailability: ProductVariantAvailability = {
      "isOnStock": false,
      "availableQuantity": 0
    }

    const isOnStock = isProductOnStock(mockAvailability)

    expect(isOnStock).toBeFalsy()
  })

  it('should return true when the isOnStock attribute for any channel is not defined', async () => {
    const mockAvailability: ProductVariantAvailability = {
      "availableQuantity": 10
    }

    const isOnStock = isProductOnStock(mockAvailability)

    expect(isOnStock).toBeTruthy()
  })

  it('should return true when the channel inventory supply provided has stock', async () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]',
        productVariantsLimit: '2'
      }
    )

    const mockAvailability: ProductVariantAvailability = {
      "channels": {
        "12345": {
          "isOnStock": true,
          "availableQuantity": 8,
          "version": 1,
          "id": "55555"
        }
      }
    }

    const isOnStock = isProductOnStock(mockAvailability)

    expect(isOnStock).toBeTruthy()
  })

  it('should return false when the channel inventory supply provided has stock', async () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]',
        productVariantsLimit: '2'
      }
    )

    const mockAvailability: ProductVariantAvailability = {
      "channels": {
        "12345": {
          "isOnStock": false,
          "availableQuantity": 0,
          "version": 1,
          "id": "55555"
        }
      }
    }

    const isOnStock = isProductOnStock(mockAvailability)

    expect(isOnStock).toBeFalsy()
  })

  it('should get the stock from any channel when the inventory supply channel provided is not found', async () => {
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
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]',
        productVariantsLimit: '2'
      }
    )

    const mockAvailability: ProductVariantAvailability = {
      "channels": {
        "123456": {
          "isOnStock": false,
          "availableQuantity": 0,
          "version": 1,
          "id": "55555"
        }
      }
    }

    const isOnStock = isProductOnStock(mockAvailability)

    expect(isOnStock).toBeFalsy()
  })
})