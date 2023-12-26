import { extractProductVariants } from './product-helper'
import { productProjectionPagedQueryResponse } from '../mocks/mocks'

jest.mock('../utils/data-utils')
jest.mock('./product-helper', () => {
  return {
    extractProductVariants: jest.fn()
  }
})

describe('extractProductVariants', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should process the products', async () => {
    await extractProductVariants(productProjectionPagedQueryResponse)

    expect(extractProductVariants).toHaveBeenCalled
  })
})