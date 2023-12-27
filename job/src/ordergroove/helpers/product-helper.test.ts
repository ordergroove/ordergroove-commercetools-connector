import { convertProductProjectionToOrdergrooveProducts } from './product-helper'
import { productProjectionPagedQueryResponse } from '../mocks/mocks'

jest.mock('../utils/data-utils')
jest.mock('./product-helper', () => {
  return {
    convertProductProjectionToOrdergrooveProducts: jest.fn()
  }
})

describe('convertProductProjectionToOrdergrooveProducts', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should process the products', async () => {
    await convertProductProjectionToOrdergrooveProducts(productProjectionPagedQueryResponse)

    expect(convertProductProjectionToOrdergrooveProducts).toHaveBeenCalled
  })
})