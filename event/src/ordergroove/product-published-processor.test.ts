import { jest } from '@jest/globals'

import { processProductPublishedEvent } from './product-published-processor'
import * as ProductsHelper from './helpers/product-helper'
import * as OgProductsApi from './client/og-products-api'
import { logger } from '../utils/logger.utils'
import {
  mockOgProductApiResponse,
  mockOgProductNotFoundApiResponse,
  mockOgProducts,
  mockProductCtEventPayload
} from './mocks/mocks'

jest.mock('./helpers/product-helper', () => {
  return {
    convertProductPublishedPayloadToOrdergrooveProducts: jest.fn()
  }
})
jest.mock('./client/og-products-api', () => {
  return {
    retrieveOgProduct: jest.fn().mockReturnValue(
      {
        success: true,
        status: 200,
        product: {
          product_id: 'ABC123',
          sku: 'ABC123',
          name: 'Test Product',
          price: 100,
          live: true,
          image_url: 'https://image-url.com',
          detail_url: ''
        }
      }
    ),
    createProducts: jest.fn().mockReturnValue(
      {
        success: true,
        status: 200
      }
    ),
    updateProducts: jest.fn().mockReturnValue(
      {
        success: true,
        status: 200
      }
    ),
  }
})
jest.mock('../utils/logger.utils', () => ({
  logger: {
    info: jest.fn().mockReturnValue(''),
    error: jest.fn().mockReturnValue(''),
  },
}))

describe('processProductPublishedEvent', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should create a product in ordergroove', async () => {
    const convertProductPublishedPayloadToOrdergrooveProductsSpy = jest
      .spyOn(ProductsHelper, 'convertProductPublishedPayloadToOrdergrooveProducts')
      .mockImplementation(() => Promise.resolve(mockOgProducts))
      .mockResolvedValue(mockOgProducts)

    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductNotFoundApiResponse))
      .mockResolvedValue(mockOgProductNotFoundApiResponse)

    const createProductsSpy = jest
      .spyOn(OgProductsApi, 'createProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processProductPublishedEvent(mockProductCtEventPayload)

    expect(convertProductPublishedPayloadToOrdergrooveProductsSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(createProductsSpy).toHaveBeenCalled()
  })

  it('should make a second attempt when the first create request fails', async () => {
    const convertProductPublishedPayloadToOrdergrooveProductsSpy = jest
      .spyOn(ProductsHelper, 'convertProductPublishedPayloadToOrdergrooveProducts')
      .mockImplementation(() => Promise.resolve(mockOgProducts))
      .mockResolvedValue(mockOgProducts)

    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductNotFoundApiResponse))
      .mockResolvedValue(mockOgProductNotFoundApiResponse)

    mockOgProductApiResponse.success = false;
    mockOgProductApiResponse.status = 500;
    const createProductsSpy = jest
      .spyOn(OgProductsApi, 'createProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processProductPublishedEvent(mockProductCtEventPayload)

    expect(convertProductPublishedPayloadToOrdergrooveProductsSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(createProductsSpy).toHaveBeenCalledTimes(2)
  })

  it('should update a product in ordergroove', async () => {
    mockOgProducts[0].live = false;
    const convertProductPublishedPayloadToOrdergrooveProductsSpy = jest
      .spyOn(ProductsHelper, 'convertProductPublishedPayloadToOrdergrooveProducts')
      .mockImplementation(() => Promise.resolve(mockOgProducts))
      .mockResolvedValue(mockOgProducts)

    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    const updateProductsSpy = jest
      .spyOn(OgProductsApi, 'updateProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processProductPublishedEvent(mockProductCtEventPayload)

    expect(convertProductPublishedPayloadToOrdergrooveProductsSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(updateProductsSpy).toHaveBeenCalled()
  })

  it('should make a second attempt when the first update request fails', async () => {
    const convertProductPublishedPayloadToOrdergrooveProductsSpy = jest
      .spyOn(ProductsHelper, 'convertProductPublishedPayloadToOrdergrooveProducts')
      .mockImplementation(() => Promise.resolve(mockOgProducts))
      .mockResolvedValue(mockOgProducts)

    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    mockOgProductApiResponse.success = false;
    mockOgProductApiResponse.status = 500;
    const updateProductsSpy = jest
      .spyOn(OgProductsApi, 'updateProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processProductPublishedEvent(mockProductCtEventPayload)

    expect(convertProductPublishedPayloadToOrdergrooveProductsSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(updateProductsSpy).toHaveBeenCalledTimes(2)
  })

  it('should write a log when an existing product does not need an update', async () => {
    mockOgProducts[0].live = true;
    const convertProductPublishedPayloadToOrdergrooveProductsSpy = jest
      .spyOn(ProductsHelper, 'convertProductPublishedPayloadToOrdergrooveProducts')
      .mockImplementation(() => Promise.resolve(mockOgProducts))
      .mockResolvedValue(mockOgProducts)

    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processProductPublishedEvent(mockProductCtEventPayload)

    expect(convertProductPublishedPayloadToOrdergrooveProductsSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(logger.info).toHaveBeenCalled()
  })
})