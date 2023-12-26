import { createProducts } from './og-products-api'
import * as OgProductsApi from './og-products-api'
import { mockOgProducts } from '../mocks/mocks'

jest.mock('./og-products-api', () => {
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

describe('createProducts', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call the Create product API in ordergroove', async () => {
    const createProductsSpy = jest
      .spyOn(OgProductsApi, 'createProducts')
      .mockImplementation(jest.fn())

    await createProducts(mockOgProducts, '12345')

    expect(createProductsSpy).toHaveBeenCalled()
  })
})


