import { Request, Response } from 'express'
import { ParsedQs } from 'qs'

import { post } from './service.controller'
import * as UploadProducts from '../ordergroove/upload-products'

jest.mock('../ordergroove/upload-products', () => {
  return {
    uploadProducts: jest.fn()
  }
})

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
    let parsedQs: ParsedQs = {}

    mockRequest.query = parsedQs

    const uploadProductsSpy = jest.spyOn(UploadProducts, 'uploadProducts')

    await post(mockRequest as Request, mockResponse as Response)

    expect(uploadProductsSpy).toHaveBeenCalledTimes(0)
  })

  it('should execute uploadProducts process', async () => {
    let parsedQs: ParsedQs = {
      "startUpload": "true"
    }

    mockRequest.query = parsedQs

    const uploadProductsSpy = jest.spyOn(UploadProducts, 'uploadProducts')

    await post(mockRequest as Request, mockResponse as Response)

    expect(uploadProductsSpy).toHaveBeenCalledTimes(1)
  })
})