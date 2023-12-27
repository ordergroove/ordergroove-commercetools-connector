import { convertProductPublishedPayloadToOrdergrooveProducts } from './product-helper'
import { mockProductCtEventPayload } from '../mocks/mocks'

jest.mock('../utils/data-utils')
jest.mock('./product-helper', () => {
  return {
    convertProductPublishedPayloadToOrdergrooveProducts: jest.fn()
  }
})

describe('convertProductPublishedPayloadToOrdergrooveProducts', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should process the products', async () => {
    await convertProductPublishedPayloadToOrdergrooveProducts(mockProductCtEventPayload)

    expect(convertProductPublishedPayloadToOrdergrooveProducts).toHaveBeenCalled
  })
})