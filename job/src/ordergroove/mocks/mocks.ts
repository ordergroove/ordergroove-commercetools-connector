import { OrdergrooveProduct, OrdergrooveApiResponse } from '../../types/custom.types';
import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk'

export const mockOgProducts: OrdergrooveProduct[] = [
  {
    product_id: 'ABC123',
    sku: 'ABC123',
    name: 'Test product',
    price: 100.00,
    live: true,
    image_url: 'https://image-url.com',
    detail_url: ''
  }
];

export const mockOgApiResponseSuccess: OrdergrooveApiResponse = {
  success: true,
  status: 207
}

export const mockProductProjectionPagedQueryResponse: ProductProjectionPagedQueryResponse = {
  "count": 1,
  "limit": 100,
  "offset": 0,
  "results": [
    {
      "categories": [
        {
          "id": "fc072771-b478-4587-ab56-f3b227507cc1",
          "typeId": "category"
        }
      ],
      "categoryOrderHints": {},
      "createdAt": "2023-12-07T23:38:56.776Z",
      "description": {
        "en-US": "Woman formal jeans"
      },
      "hasStagedChanges": false,
      "id": "942a49cb-9ec9-4d72-8a89-672f8d9ad8df",
      "key": "woman-formal-jeans",
      "lastModifiedAt": "2023-12-07T23:39:03.450Z",
      "masterVariant": {
        "scopedPrice": {
          "currentValue": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1500,
            "fractionDigits": 2
          },
          "channel": {
            "typeId": "channel",
            "id": "12345"
          },
          "country": "US",
          "value": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1500,
            "fractionDigits": 2
          },
          "id": "11111"
        },
        "availability": {
          "isOnStock": true,
          "availableQuantity": 73
        },
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
        "prices": [
          {
            "id": "5a1b146f-2389-4146-9090-7c8d26119896",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1000,
              "fractionDigits": 2
            },
            "key": "woman-slimfit-black-jeans-s-price"
          }
        ],
        "sku": "WFJS"
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
        "id": "36754d8a-5e40-46fc-872a-58bd9795d8b4",
        "typeId": "product-type"
      },
      "published": true,
      "searchKeywords": {},
      "slug": {
        "en-US": "woman-formal-jeans"
      },
      "taxCategory": {
        "id": "cdb0601d-2a50-4db8-a719-4a337b7da385",
        "typeId": "tax-category"
      },
      "variants": [
        {
          "scopedPrice": {
            "currentValue": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1500,
              "fractionDigits": 2
            },
            "channel": {
              "typeId": "channel",
              "id": "12345"
            },
            "country": "US",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1500,
              "fractionDigits": 2
            },
            "id": "11111"
          },
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
          "id": 2,
          "images": [],
          "key": "woman-formal-jeans-m",
          "prices": [
            {
              "id": "5a1b146f-2389-4146-9090-7c8d26119896",
              "value": {
                "type": "centPrecision",
                "currencyCode": "USD",
                "centAmount": 1000,
                "fractionDigits": 2
              },
              "key": "woman-slimfit-black-jeans-s-price"
            }
          ],
          "sku": "WFJM"
        }
      ],
      "version": 2
    }
  ],
  "total": 1
}

export const mockProductProjectionPagedQueryResponseWithInvalidLanguageCode: ProductProjectionPagedQueryResponse = {
  "count": 1,
  "limit": 100,
  "offset": 0,
  "results": [
    {
      "categories": [
        {
          "id": "fc072771-b478-4587-ab56-f3b227507cc1",
          "typeId": "category"
        }
      ],
      "categoryOrderHints": {},
      "createdAt": "2023-12-07T23:38:56.776Z",
      "description": {
        "en": "Woman formal jeans"
      },
      "hasStagedChanges": false,
      "id": "942a49cb-9ec9-4d72-8a89-672f8d9ad8df",
      "key": "woman-formal-jeans",
      "lastModifiedAt": "2023-12-07T23:39:03.450Z",
      "masterVariant": {
        "scopedPrice": {
          "currentValue": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1500,
            "fractionDigits": 2
          },
          "channel": {
            "typeId": "channel",
            "id": "12345"
          },
          "country": "US",
          "value": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1500,
            "fractionDigits": 2
          },
          "id": "11111"
        },
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
        "prices": [
          {
            "id": "5a1b146f-2389-4146-9090-7c8d26119896",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1000,
              "fractionDigits": 2
            },
            "key": "woman-slimfit-black-jeans-s-price"
          }
        ],
        "sku": "WFJS"
      },
      "metaDescription": {
        "en-US": ""
      },
      "metaTitle": {
        "en-US": ""
      },
      "name": {
        "en": "Woman formal jeans"
      },
      "priceMode": "Embedded",
      "productType": {
        "id": "36754d8a-5e40-46fc-872a-58bd9795d8b4",
        "typeId": "product-type"
      },
      "published": true,
      "searchKeywords": {},
      "slug": {
        "en-US": "woman-formal-jeans"
      },
      "taxCategory": {
        "id": "cdb0601d-2a50-4db8-a719-4a337b7da385",
        "typeId": "tax-category"
      },
      "variants": [
        {
          "scopedPrice": {
            "currentValue": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1500,
              "fractionDigits": 2
            },
            "channel": {
              "typeId": "channel",
              "id": "12345"
            },
            "country": "US",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1500,
              "fractionDigits": 2
            },
            "id": "11111"
          },
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
          "id": 2,
          "images": [],
          "key": "woman-formal-jeans-m",
          "prices": [
            {
              "id": "5a1b146f-2389-4146-9090-7c8d26119896",
              "value": {
                "type": "centPrecision",
                "currencyCode": "USD",
                "centAmount": 1000,
                "fractionDigits": 2
              },
              "key": "woman-slimfit-black-jeans-s-price"
            }
          ],
          "sku": "WFJM"
        }
      ],
      "version": 2
    }
  ],
  "total": 1
}

export const mockProductProjectionPagedQueryResponseWithoutScopedPrice: ProductProjectionPagedQueryResponse = {
  "count": 1,
  "limit": 100,
  "offset": 0,
  "results": [
    {
      "categories": [
        {
          "id": "fc072771-b478-4587-ab56-f3b227507cc1",
          "typeId": "category"
        }
      ],
      "categoryOrderHints": {},
      "createdAt": "2023-12-07T23:38:56.776Z",
      "description": {
        "en-US": "Woman formal jeans"
      },
      "hasStagedChanges": false,
      "id": "942a49cb-9ec9-4d72-8a89-672f8d9ad8df",
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
        "prices": [
          {
            "id": "5a1b146f-2389-4146-9090-7c8d26119896",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1000,
              "fractionDigits": 2
            },
            "key": "woman-slimfit-black-jeans-s-price"
          }
        ],
        "sku": "WFJS"
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
        "id": "36754d8a-5e40-46fc-872a-58bd9795d8b4",
        "typeId": "product-type"
      },
      "published": true,
      "searchKeywords": {},
      "slug": {
        "en-US": "woman-formal-jeans"
      },
      "taxCategory": {
        "id": "cdb0601d-2a50-4db8-a719-4a337b7da385",
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
          "id": 2,
          "images": [],
          "key": "woman-formal-jeans-m",
          "prices": [
            {
              "id": "5a1b146f-2389-4146-9090-7c8d26119896",
              "value": {
                "type": "centPrecision",
                "currencyCode": "USD",
                "centAmount": 1000,
                "fractionDigits": 2
              },
              "key": "woman-slimfit-black-jeans-s-price"
            }
          ],
          "sku": "WFJM"
        }
      ],
      "version": 2
    }
  ],
  "total": 1
}

export const mockProductProjectionPagedQueryResponseVariantWithoutImage: ProductProjectionPagedQueryResponse = {
  "count": 1,
  "limit": 100,
  "offset": 0,
  "results": [
    {
      "categories": [
        {
          "id": "fc072771-b478-4587-ab56-f3b227507cc1",
          "typeId": "category"
        }
      ],
      "categoryOrderHints": {},
      "createdAt": "2023-12-07T23:38:56.776Z",
      "description": {
        "en-US": "Woman formal jeans"
      },
      "hasStagedChanges": false,
      "id": "942a49cb-9ec9-4d72-8a89-672f8d9ad8df",
      "key": "woman-formal-jeans",
      "lastModifiedAt": "2023-12-07T23:39:03.450Z",
      "masterVariant": {
        "scopedPrice": {
          "currentValue": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1500,
            "fractionDigits": 2
          },
          "channel": {
            "typeId": "channel",
            "id": "12345"
          },
          "country": "US",
          "value": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1500,
            "fractionDigits": 2
          },
          "id": "11111"
        },
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
        "images": [
          {
            "url": "https://image.jpg",
            "dimensions": {
              "w": 6000,
              "h": 4000
            }
          }
        ],
        "key": "woman-formal-jeans-s",
        "prices": [
          {
            "id": "5a1b146f-2389-4146-9090-7c8d26119896",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1000,
              "fractionDigits": 2
            },
            "key": "woman-slimfit-black-jeans-s-price"
          }
        ],
        "sku": "WFJS"
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
        "id": "36754d8a-5e40-46fc-872a-58bd9795d8b4",
        "typeId": "product-type"
      },
      "published": true,
      "searchKeywords": {},
      "slug": {
        "en-US": "woman-formal-jeans"
      },
      "taxCategory": {
        "id": "cdb0601d-2a50-4db8-a719-4a337b7da385",
        "typeId": "tax-category"
      },
      "variants": [
        {
          "scopedPrice": {
            "currentValue": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1500,
              "fractionDigits": 2
            },
            "channel": {
              "typeId": "channel",
              "id": "12345"
            },
            "country": "US",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1500,
              "fractionDigits": 2
            },
            "id": "11111"
          },
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
          "id": 2,
          "images": [],
          "key": "woman-formal-jeans-m",
          "prices": [
            {
              "id": "5a1b146f-2389-4146-9090-7c8d26119896",
              "value": {
                "type": "centPrecision",
                "currencyCode": "USD",
                "centAmount": 1000,
                "fractionDigits": 2
              },
              "key": "woman-slimfit-black-jeans-s-price"
            }
          ],
          "sku": "WFJM"
        }
      ],
      "version": 2
    }
  ],
  "total": 1
}

export const mockProductProjectionPagedQueryResponseStockInChannel: ProductProjectionPagedQueryResponse = {
  "count": 1,
  "limit": 100,
  "offset": 0,
  "results": [
    {
      "categories": [
        {
          "id": "fc072771-b478-4587-ab56-f3b227507cc1",
          "typeId": "category"
        }
      ],
      "categoryOrderHints": {},
      "createdAt": "2023-12-07T23:38:56.776Z",
      "description": {
        "en-US": "Woman formal jeans"
      },
      "hasStagedChanges": false,
      "id": "942a49cb-9ec9-4d72-8a89-672f8d9ad8df",
      "key": "woman-formal-jeans",
      "lastModifiedAt": "2023-12-07T23:39:03.450Z",
      "masterVariant": {
        "scopedPrice": {
          "currentValue": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1500,
            "fractionDigits": 2
          },
          "channel": {
            "typeId": "channel",
            "id": "12345"
          },
          "country": "US",
          "value": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1500,
            "fractionDigits": 2
          },
          "id": "11111"
        },
        "availability": {
          "channels": {
            "12345": {
              "isOnStock": true,
              "availableQuantity": 8,
              "version": 1,
              "id": "55555"
            }
          }
        },
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
        "prices": [
          {
            "id": "5a1b146f-2389-4146-9090-7c8d26119896",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1000,
              "fractionDigits": 2
            },
            "key": "woman-slimfit-black-jeans-s-price"
          }
        ],
        "sku": "WFJS"
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
        "id": "36754d8a-5e40-46fc-872a-58bd9795d8b4",
        "typeId": "product-type"
      },
      "published": true,
      "searchKeywords": {},
      "slug": {
        "en-US": "woman-formal-jeans"
      },
      "taxCategory": {
        "id": "cdb0601d-2a50-4db8-a719-4a337b7da385",
        "typeId": "tax-category"
      },
      "variants": [
        {
          "scopedPrice": {
            "currentValue": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1500,
              "fractionDigits": 2
            },
            "channel": {
              "typeId": "channel",
              "id": "12345"
            },
            "country": "US",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1500,
              "fractionDigits": 2
            },
            "id": "11111"
          },
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
          "id": 2,
          "images": [],
          "key": "woman-formal-jeans-m",
          "prices": [
            {
              "id": "5a1b146f-2389-4146-9090-7c8d26119896",
              "value": {
                "type": "centPrecision",
                "currencyCode": "USD",
                "centAmount": 1000,
                "fractionDigits": 2
              },
              "key": "woman-slimfit-black-jeans-s-price"
            }
          ],
          "sku": "WFJM"
        }
      ],
      "version": 2
    }
  ],
  "total": 1
}

export const mockProductProjectionPagedQueryResponseStockForAny: ProductProjectionPagedQueryResponse = {
  "count": 1,
  "limit": 100,
  "offset": 0,
  "results": [
    {
      "categories": [
        {
          "id": "fc072771-b478-4587-ab56-f3b227507cc1",
          "typeId": "category"
        }
      ],
      "categoryOrderHints": {},
      "createdAt": "2023-12-07T23:38:56.776Z",
      "description": {
        "en-US": "Woman formal jeans"
      },
      "hasStagedChanges": false,
      "id": "942a49cb-9ec9-4d72-8a89-672f8d9ad8df",
      "key": "woman-formal-jeans",
      "lastModifiedAt": "2023-12-07T23:39:03.450Z",
      "masterVariant": {
        "scopedPrice": {
          "currentValue": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1500,
            "fractionDigits": 2
          },
          "channel": {
            "typeId": "channel",
            "id": "12345"
          },
          "country": "US",
          "value": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1500,
            "fractionDigits": 2
          },
          "id": "11111"
        },
        "availability": {
          "isOnStock": true,
          "availableQuantity": 73,
          "channels": {
            "12345": {
              "isOnStock": true,
              "availableQuantity": 8,
              "version": 1,
              "id": "55555"
            }
          }
        },
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
        "prices": [
          {
            "id": "5a1b146f-2389-4146-9090-7c8d26119896",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1000,
              "fractionDigits": 2
            },
            "key": "woman-slimfit-black-jeans-s-price"
          }
        ],
        "sku": "WFJS"
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
        "id": "36754d8a-5e40-46fc-872a-58bd9795d8b4",
        "typeId": "product-type"
      },
      "published": true,
      "searchKeywords": {},
      "slug": {
        "en-US": "woman-formal-jeans"
      },
      "taxCategory": {
        "id": "cdb0601d-2a50-4db8-a719-4a337b7da385",
        "typeId": "tax-category"
      },
      "variants": [
        {
          "scopedPrice": {
            "currentValue": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1500,
              "fractionDigits": 2
            },
            "channel": {
              "typeId": "channel",
              "id": "12345"
            },
            "country": "US",
            "value": {
              "type": "centPrecision",
              "currencyCode": "USD",
              "centAmount": 1500,
              "fractionDigits": 2
            },
            "id": "11111"
          },
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
          "id": 2,
          "images": [],
          "key": "woman-formal-jeans-m",
          "prices": [
            {
              "id": "5a1b146f-2389-4146-9090-7c8d26119896",
              "value": {
                "type": "centPrecision",
                "currencyCode": "USD",
                "centAmount": 1000,
                "fractionDigits": 2
              },
              "key": "woman-slimfit-black-jeans-s-price"
            }
          ],
          "sku": "WFJM"
        }
      ],
      "version": 2
    }
  ],
  "total": 1
}