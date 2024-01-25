import { jest } from '@jest/globals'

import * as CtProductsApi from './client/ct-products-api'
import * as OgProductsApi from './client/og-products-api'
import * as ProductHelper from './helpers/product-helper'
import * as ConfigUtils from '../utils/config.utils'
import * as CustomObjectsHelper from './helpers/custom-objects-helper'
import { uploadProducts } from './upload-products'
import {
  mockProductProjectionPagedQueryResponse, mockOgProducts
} from './mocks/mocks'
import { OrdergrooveApiResponse } from '../types/custom.types'

jest.mock('./client/ct-products-api')
jest.mock('./helpers/product-helper')
jest.mock('./client/og-products-api')
jest.mock('./helpers/custom-objects-helper')
jest.mock('../utils/config.utils', () => ({
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

describe('uploadProducts', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call productProjectionsSearch(), convertProductProjectionToOrdergrooveProducts() and createProducts() functions', async () => {
    const ordergrooveApiResponse: OrdergrooveApiResponse = {
      success: true,
      status: 200
    }

    const getProductProjectionsSpy= jest
      .spyOn(CtProductsApi, 'getProductProjections')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponse))
      .mockResolvedValue(mockProductProjectionPagedQueryResponse)

    const convertProductProjectionToOrdergrooveProductsSpy = jest
      .spyOn(ProductHelper, 'convertProductProjectionToOrdergrooveProducts')
      .mockImplementation(() => Promise.resolve(mockOgProducts))
      .mockResolvedValue(mockOgProducts)

    const createProductsSpy = jest
      .spyOn(OgProductsApi, 'createProducts')
      .mockImplementation(() => Promise.resolve(ordergrooveApiResponse))
      .mockResolvedValue(ordergrooveApiResponse)

    const setJobStatusSpy = jest
      .spyOn(CustomObjectsHelper, 'setJobStatus')
      .mockImplementation(() => Promise.resolve(true))
      .mockResolvedValue(true)

    const result = await uploadProducts(0)

    expect(getProductProjectionsSpy).toHaveBeenCalled()
    expect(convertProductProjectionToOrdergrooveProductsSpy).toHaveBeenCalled()
    expect(createProductsSpy).toHaveBeenCalledTimes(1)
    expect(setJobStatusSpy).toHaveBeenCalledTimes(1)
    expect(result).toBe(true)
  })

  it('should make a second attempt to create the custom object if the first attempt fails, upon completion of the product load process.', async () => {
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
        distributionChannelId: '',
        inventorySupplyChannelId: '',
        ordergrooveApiUrl: 'https://api',
        ordergrooveApiKey: 'ordergrooveApiKey',
        productStoreUrl: 'https://product/detail/[SLUG]'
      }
    )

    const ordergrooveApiResponse: OrdergrooveApiResponse = {
      success: true,
      status: 200
    }

    const getProductProjectionsSpy = jest
      .spyOn(CtProductsApi, 'getProductProjections')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponse))
      .mockResolvedValue(mockProductProjectionPagedQueryResponse)

    const convertProductProjectionToOrdergrooveProductsSpy = jest
      .spyOn(ProductHelper, 'convertProductProjectionToOrdergrooveProducts')
      .mockImplementation(() => Promise.resolve(mockOgProducts))
      .mockResolvedValue(mockOgProducts)

    const createProductsSpy = jest
      .spyOn(OgProductsApi, 'createProducts')
      .mockImplementation(() => Promise.resolve(ordergrooveApiResponse))
      .mockResolvedValue(ordergrooveApiResponse)

    const setJobStatusSpy = jest
      .spyOn(CustomObjectsHelper, 'setJobStatus')
      .mockImplementation(() => Promise.resolve(true))
      .mockResolvedValue(false)

    const result = await uploadProducts(0)

    expect(getProductProjectionsSpy).toHaveBeenCalled()
    expect(convertProductProjectionToOrdergrooveProductsSpy).toHaveBeenCalled()
    expect(createProductsSpy).toHaveBeenCalledTimes(1)
    expect(setJobStatusSpy).toHaveBeenCalledTimes(2)
    expect(result).toBe(true)
  })

  it('should handle an error from productProjectionsSearch()', async () => {
    jest.spyOn(CtProductsApi, 'getProductProjections')
      .mockImplementation(() => { throw new Error('connection error') })

    const result = await uploadProducts(0)

    expect(CtProductsApi.getProductProjections).toThrow('connection error')
    expect(result).toBe(true)
  })
})