import { Request, Response } from 'express'

import { post } from './job.controller'
import * as UploadProducts from '../ordergroove/upload-products'
import * as CustomObjectsHelper from '../ordergroove/helpers/custom-objects-helper'
import * as ConfigUtils from '../utils/config.utils'
import { JobStatus } from '../types/custom.types'

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

  it('should not execute uploadProducts process when the status is COMPLETED', async () => {
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

    const jobStatus: JobStatus = {
      currentOffset: 1000,
      status: CustomObjectsHelper.Status.COMPLETED,
      thisCustomObjectExists: true
    }
    const getJobStatusSpy =
      jest.spyOn(CustomObjectsHelper, 'getJobStatus').mockResolvedValue(jobStatus)

    const uploadProductsSpy = jest.spyOn(UploadProducts, 'uploadProducts')

    await post(mockRequest as Request, mockResponse as Response)

    expect(getJobStatusSpy).toHaveBeenCalled()
    expect(uploadProductsSpy).toHaveBeenCalledTimes(0)
  })

  it('should execute uploadProducts process when the custom object for the status does not exist', async () => {
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

    const jobStatus: JobStatus = {
      currentOffset: undefined,
      status: undefined,
      thisCustomObjectExists: false
    }
    const getJobStatusSpy =
      jest.spyOn(CustomObjectsHelper, 'getJobStatus').mockResolvedValue(jobStatus)

    const uploadProductsSpy = jest.spyOn(UploadProducts, 'uploadProducts')

    await post(mockRequest as Request, mockResponse as Response)

    expect(getJobStatusSpy).toHaveBeenCalled()
    expect(uploadProductsSpy).toHaveBeenCalledTimes(1)
  })

  it('should execute uploadProducts process when the job status is ACTIVE', async () => {
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

    const jobStatus: JobStatus = {
      currentOffset: 100,
      status: CustomObjectsHelper.Status.ACTIVE,
      thisCustomObjectExists: true
    }
    const getJobStatusSpy =
      jest.spyOn(CustomObjectsHelper, 'getJobStatus').mockResolvedValue(jobStatus)

    const uploadProductsSpy = jest.spyOn(UploadProducts, 'uploadProducts')

    await post(mockRequest as Request, mockResponse as Response)

    expect(getJobStatusSpy).toHaveBeenCalled()
    expect(uploadProductsSpy).toHaveBeenCalledTimes(1)
    expect(uploadProductsSpy).toHaveBeenCalledWith(100)
  })

  it('should throw an error when the getJobStatus function throws an error', async () => {
    const NotFoundObj = {
      message: 'Unexpected error'
    }

    jest.spyOn(CustomObjectsHelper, 'getJobStatus')
      .mockImplementation(() => { throw new Object(NotFoundObj) })

    expect(async () => {
      await post(mockRequest as Request, mockResponse as Response)
    }).rejects.toThrow();
  })
})