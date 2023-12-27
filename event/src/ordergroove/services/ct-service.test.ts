import * as CtService from './ct-service'
import { getProductVariantBySku, getProductProjectionBySkuWithScopedPrice } from './ct-service'
import * as CtProductsApi from '../client/ct-products-api'
import { mockProductProjectionPagedQueryResponse } from '../mocks/mocks'

jest.mock('../client/ct-products-api', () => {
  return {
    productProjectionsSearch: jest.fn().mockReturnValue(
      {
        "count": 1,
        "limit": 100,
        "offset": 0,
        "results": [
          {
            "categories": [
              {
                "id": "11111",
                "typeId": "category"
              }
            ],
            "categoryOrderHints": {},
            "createdAt": "2023-12-07T23:38:56.776Z",
            "description": {
              "en-US": "Woman formal jeans"
            },
            "hasStagedChanges": false,
            "id": "22222",
            "key": "woman-formal-jeans",
            "lastModifiedAt": "2023-12-07T23:39:03.450Z",
            "masterVariant": {
              "assets": [],
              "attributes": [
                {
                  "name": "woman-jeans-color-attribute",
                  "value": {
                    "key": "black",
                    "label": "Black"
                  }
                }
              ],
              "id": 1,
              "images": [],
              "key": "woman-formal-jeans-s",
              "prices": [],
              "sku": "WFJS",
              "availability": {
                "isOnStock": true,
                "availableQuantity": 100
              }

            },
            "metaDescription": {
              "en-US": ""
            },
            "metaTitle": {
              "en-US": ""
            },
            "name": {
              "en-US": "Woman formal jeans"
            },
            "priceMode": "Embedded",
            "productType": {
              "id": "33333",
              "typeId": "product-type"
            },
            "published": true,
            "searchKeywords": {},
            "slug": {
              "en-US": "woman-formal-jeans"
            },
            "taxCategory": {
              "id": "44444",
              "typeId": "tax-category"
            },
            "variants": [
              {
                "assets": [],
                "attributes": [
                  {
                    "name": "woman-jeans-color-attribute",
                    "value": {
                      "key": "black",
                      "label": "Black"
                    }
                  }
                ],
                "availability": {
                  "isOnStock": true,
                  "availableQuantity": 100
                },
                "id": 2,
                "images": [],
                "key": "woman-formal-jeans-m",
                "prices": [],
                "sku": "WFJM"
              }
            ],
            "version": 2
          }
        ],
        "total": 1
      }
    )
  }
})

describe('getProductVariantBySku', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call the commercetools product projections API and get a product filtered by sku with scoped price', async () => {
    const getProductProjectionBySkuWithScopedPriceSpy = jest
      .spyOn(CtService, 'getProductProjectionBySkuWithScopedPrice')

    const productProjectionsSearchSpy = jest
      .spyOn(CtProductsApi, 'productProjectionsSearch')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponse))
      .mockResolvedValue(mockProductProjectionPagedQueryResponse)

    const result = await getProductProjectionBySkuWithScopedPrice('WFJM')

    expect(getProductProjectionBySkuWithScopedPriceSpy).toHaveBeenCalled()
    expect(productProjectionsSearchSpy).toHaveBeenCalled()
  })

  it('should call the commercetools product projections API and get a product filtered by sku', async () => {
    const getProductVariantBySkuSpy = jest
      .spyOn(CtService, 'getProductVariantBySku')

    const productProjectionsSearchSpy = jest
      .spyOn(CtProductsApi, 'productProjectionsSearch')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponse))
      .mockResolvedValue(mockProductProjectionPagedQueryResponse)

    const result = await getProductVariantBySku('WFJM')

    expect(getProductVariantBySkuSpy).toHaveBeenCalled()
    expect(productProjectionsSearchSpy).toHaveBeenCalled()
  })
})