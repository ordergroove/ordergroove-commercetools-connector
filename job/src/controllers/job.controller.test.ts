import { Request, Response } from 'express'

import { post } from './job.controller'
import * as UploadProducts from '../ordergroove/upload-products'
import * as CustomObjectsHelper from '../ordergroove/helpers/custom-objects-helper'
import * as ConfigUtils from '../utils/config.utils'

jest.mock('../ordergroove/helpers/custom-objects-helper')
jest.mock('../ordergroove/upload-products')
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

describe('post function', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  beforeEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    mockRequest = {}
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
  })

  it('should not execute uploadProducts process', async () => {
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
        productStoreUrl: 'https://product/detail/[SLUG]',
        productVariantsLimit: '500'
      }
    )

    const isInitialProductLoadExecutableSpy =
      jest.spyOn(CustomObjectsHelper, 'isInitialProductLoadExecutable').mockResolvedValue(false);

    const uploadProductsSpy = jest.spyOn(UploadProducts, 'uploadProducts')

    await post(mockRequest as Request, mockResponse as Response)

    expect(isInitialProductLoadExecutableSpy).toHaveBeenCalled()
    expect(uploadProductsSpy).toHaveBeenCalledTimes(0)
  })

  it('should execute uploadProducts process', async () => {
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
        productStoreUrl: 'https://product/detail/[SLUG]',
        productVariantsLimit: '500'
      }
    )

    const isInitialProductLoadExecutableSpy =
      jest.spyOn(CustomObjectsHelper, 'isInitialProductLoadExecutable').mockResolvedValue(true);

    const uploadProductsSpy = jest.spyOn(UploadProducts, 'uploadProducts')

    await post(mockRequest as Request, mockResponse as Response)

    expect(isInitialProductLoadExecutableSpy).toHaveBeenCalled()
    expect(uploadProductsSpy).toHaveBeenCalledTimes(1)
  })
})