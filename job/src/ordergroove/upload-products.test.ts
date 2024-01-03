import { jest } from '@jest/globals'

import * as CtProductsApi from './client/ct-products-api'
import * as OgProductsApi from './client/og-products-api'
import * as ProductHelper from './helpers/product-helper'
import { uploadProducts } from './upload-products'
import { mockProductProjectionPagedQueryResponse, mockOgProducts } from './mocks/mocks'
import { OrdergrooveApiResponse } from '../types/custom.types';

jest.mock('./client/ct-products-api')
jest.mock('./helpers/product-helper')
jest.mock('./client/og-products-api')
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
    ordergrooveApiUrl: process.env.OG_API_URL as string,
    ordergrooveApiKey: 'ordergrooveApiKey'
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

    const productProjectionsSearchSpy = jest
      .spyOn(CtProductsApi, 'productProjectionsSearch')
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

    const result = await uploadProducts(1, 0)

    expect(productProjectionsSearchSpy).toHaveBeenCalled()
    expect(convertProductProjectionToOrdergrooveProductsSpy).toHaveBeenCalled()
    expect(createProductsSpy).toHaveBeenCalledTimes(1)
    expect(result).toBe(true)
  })

  it('should handle an error from productProjectionsSearch()', async () => {
    jest.spyOn(CtProductsApi, 'productProjectionsSearch')
      .mockImplementation(() => { throw new Error('connection error') });

    const result = await uploadProducts(1, 0)

    expect(CtProductsApi.productProjectionsSearch).toThrow('connection error');
    expect(result).toBe(true)
  })
})