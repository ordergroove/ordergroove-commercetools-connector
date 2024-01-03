import { ProductProjectionPagedQueryResponse, ProductVariant } from '@commercetools/platform-sdk'

import { OrdergrooveProduct, OrdergrooveApiResponse, CtEventPayload } from '../../types/custom.types';

export const mockOgProduct: OrdergrooveProduct = {
  product_id: 'ABC123',
  sku: 'ABC123',
  name: 'Test product',
  price: 100.00,
  live: true,
  image_url: 'https://image-url.com',
  detail_url: ''
};

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

export const mockOgProductApiResponse: OrdergrooveApiResponse = {
  success: true,
  status: 200,
  product: mockOgProduct
}

export const mockOgProductNotFoundApiResponse: OrdergrooveApiResponse = {
  success: true,
  status: 200,
  product: undefined
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
        "en": "woman-formal-jeans"
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

export const mockProductCtEventPayload: CtEventPayload = {
  notificationType: 'Message',
  projectKey: 'project-key',
  id: '12345',
  version: 1,
  sequenceNumber: 123,
  resource: {
    typeId: 'product',
    id: '123'
  },
  resourceVersion: 1,
  type: 'ProductPublished',
  productProjection: {
    "id": "11111",
    "version": 5,
    "productType": {
      "typeId": "product-type",
      "id": "22222"
    },
    "name": {
      "en-US": "Product"
    },
    "description": {
      "en-US": "This product"
    },
    "categories": [
      {
        "typeId": "category",
        "id": "33333"
      }
    ],
    "categoryOrderHints": {},
    "slug": {
      "en-US": "product"
    },
    "masterVariant": {
      "id": 1,
      "sku": "WFJS",
      "prices": [
        {
          "id": "12345",
          "value": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 399,
            "fractionDigits": 2
          },
          "country": "US"
        }
      ],
      "images": [
        {
          "url": "https://image.com",
          "dimensions": {
            "w": 5056,
            "h": 4784
          }
        }
      ],
      "attributes": [],
      "assets": [],
      "availability": {
        "isOnStock": true,
        "availableQuantity": 100
      }
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
        "prices": [],
        "sku": "WFJM"
      }
    ],
    "searchKeywords": {},
    "hasStagedChanges": false,
    "published": true,
    "key": "my-product",
    "taxCategory": {
      "typeId": "tax-category",
      "id": "12345asdfg"
    },
    "createdAt": "2023-11-27T16:37:54.212Z",
    "lastModifiedAt": "2023-11-29T19:28:24.534Z"
  },
  createdAt: '2023-11-29T21:51:17.902Z',
  lastModifiedAt: '2023-11-29T21:51:17.902Z',
  createdBy: { "clientId": "1q1q1q1q1q" },
  lastModifiedBy: { "clientId": "1q1q1q1q1q" }
}

export const mockInventoryEntryDeletedEventPayload: CtEventPayload = {
  createdAt: "2023-12-20T00:59:57.569Z",
  id: "12345-ABCDE",
  lastModifiedAt: "2023-12-20T00:59:57.569Z",
  notificationType: "Message",
  projectKey: "project-key",
  resource: {
    "id": "11111",
    "typeId": "inventory-entry"
  },
  resourceUserProvidedIdentifiers: {
    "sku": "WFJM"
  },
  resourceVersion: 2,
  sequenceNumber: 2,
  sku: "WFJM",
  supplyChannel: {
    "id": "11111",
    "typeId": "channel"
  },
  type: "InventoryEntryDeleted",
  version: 1,
  createdBy: { "clientId": "1q1q1q1q1q" },
  lastModifiedBy: { "clientId": "1q1q1q1q1q" }
}

export const mockOrderCreatedEventPayload: CtEventPayload = {
  "notificationType": "Message",
  "projectKey": "lucina-connect",
  "id": "11111",
  "version": 1,
  "sequenceNumber": 1,
  "resource": {
    "typeId": "order",
    "id": "11111"
  },
  "resourceVersion": 1,
  "type": "OrderCreated",
  "order": {
    "id": "11111",
    "version": 1,
    "lastMessageSequenceNumber": 1,
    "createdAt": "2023-11-30T19:09:26.066Z",
    "lastModifiedAt": "2023-11-30T19:09:26.066Z",
    "lastModifiedBy": { "clientId": "1q1q1q1q1q" },
    "createdBy": { "clientId": "1q1q1q1q1q" },
    "customerId": "11111",
    "customerEmail": "jen@example.com",
    "totalPrice": {
      "type": "centPrecision",
      "currencyCode": "USD",
      "centAmount": 6000,
      "fractionDigits": 2
    },
    "taxedPrice": {
      "totalNet": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 6000,
        "fractionDigits": 2
      },
      "totalGross": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 6240,
        "fractionDigits": 2
      },
      "taxPortions": [
        {
          "rate": 0.04,
          "amount": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 240,
            "fractionDigits": 2
          },
          "name": "State Tax: New York"
        }
      ],
      "totalTax": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 240,
        "fractionDigits": 2
      }
    },
    "taxedShippingPrice": {
      "totalNet": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 5000,
        "fractionDigits": 2
      },
      "totalGross": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 5200,
        "fractionDigits": 2
      },
      "taxPortions": [
        {
          "rate": 0.04,
          "amount": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 200,
            "fractionDigits": 2
          },
          "name": "State Tax: New York"
        }
      ],
      "totalTax": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 200,
        "fractionDigits": 2
      }
    },
    "orderState": "Open",
    "syncInfo": [],
    "returnInfo": [],
    "taxMode": "Platform",
    "inventoryMode": "ReserveOnOrder",
    "taxRoundingMode": "HalfEven",
    "taxCalculationMode": "LineItemLevel",
    "origin": "Merchant",
    "shippingMode": "Single",
    "shippingInfo": {
      "shippingMethodName": "US Delivery",
      "price": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 5000,
        "fractionDigits": 2
      },
      "shippingRate": {
        "price": {
          "type": "centPrecision",
          "currencyCode": "USD",
          "centAmount": 5000,
          "fractionDigits": 2
        },
        "freeAbove": {
          "type": "centPrecision",
          "currencyCode": "USD",
          "centAmount": 100000,
          "fractionDigits": 2
        },
        "tiers": []
      },
      "taxRate": {
        "name": "State Tax: New York",
        "amount": 0.04,
        "includedInPrice": false,
        "country": "US",
        "state": "New York",
        "id": "6vQNQZKs",
        "key": "ny-state-tax",
        "subRates": []
      },
      "taxCategory": {
        "typeId": "tax-category",
        "id": "11111"
      },
      "deliveries": [],
      "shippingMethod": {
        "typeId": "shipping-method",
        "id": "11111"
      },
      "taxedPrice": {
        "totalNet": {
          "type": "centPrecision",
          "currencyCode": "USD",
          "centAmount": 5000,
          "fractionDigits": 2
        },
        "totalGross": {
          "type": "centPrecision",
          "currencyCode": "USD",
          "centAmount": 5200,
          "fractionDigits": 2
        },
        "totalTax": {
          "type": "centPrecision",
          "currencyCode": "USD",
          "centAmount": 200,
          "fractionDigits": 2
        }
      },
      "shippingMethodState": "MatchesCart"
    },
    "shippingAddress": {
      "id": "3UjigDbr",
      "firstName": "Jennifer",
      "lastName": "Robinson",
      "streetName": "Second Street",
      "streetNumber": "15",
      "postalCode": "10001",
      "city": "New York City",
      "state": "New York",
      "country": "US"
    },
    "shipping": [],
    "lineItems": [
      {
        "id": "11111",
        "productId": "11111",
        "productKey": "woman-slimfit-black-jeans-product",
        "name": {
          "en-US": "Woman Slimfit Black Jeanss"
        },
        "productType": {
          "typeId": "product-type",
          "id": "11111"
        },
        "variant": {
          "id": 3,
          "sku": "WSFBJS",
          "key": "woman-slimfit-black-jeans-s-product-variant",
          "prices": [
            {
              "id": "11111",
              "value": {
                "type": "centPrecision",
                "currencyCode": "USD",
                "centAmount": 1000,
                "fractionDigits": 2
              },
              "key": "woman-slimfit-black-jeans-s-price"
            }
          ],
          "images": [],
          "attributes": [
            {
              "name": "woman-jeans-color-attribute",
              "value": {
                "key": "black",
                "label": "Black"
              }
            }
          ],
          "assets": [],
          "availability": {
            "isOnStock": true,
            "availableQuantity": 1
          }
        },
        "price": {
          "id": "11111",
          "value": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1000,
            "fractionDigits": 2
          },
          "key": "woman-slimfit-black-jeans-s-price"
        },
        "quantity": 1,
        "discountedPricePerQuantity": [],
        "taxRate": {
          "name": "State Tax: New York",
          "amount": 0.04,
          "includedInPrice": false,
          "country": "US",
          "state": "New York",
          "id": "6vQNQZKs",
          "key": "ny-state-tax",
          "subRates": []
        },
        "perMethodTaxRate": [],
        "addedAt": "2023-11-30T19:08:32.253Z",
        "lastModifiedAt": "2023-11-30T19:08:32.253Z",
        "state": [
          {
            "quantity": 1,
            "state": {
              "typeId": "state",
              "id": "11111"
            }
          }
        ],
        "priceMode": "Platform",
        "lineItemMode": "Standard",
        "totalPrice": {
          "type": "centPrecision",
          "currencyCode": "USD",
          "centAmount": 1000,
          "fractionDigits": 2
        },
        "taxedPrice": {
          "totalNet": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1000,
            "fractionDigits": 2
          },
          "totalGross": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 1040,
            "fractionDigits": 2
          },
          "totalTax": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 40,
            "fractionDigits": 2
          }
        },
        "taxedPricePortions": []
      }
    ],
    "customLineItems": [],
    "discountCodes": [],
    "cart": {
      "typeId": "cart",
      "id": "11111"
    },
    "billingAddress": {
      "id": "3UjigDbr",
      "firstName": "Jennifer",
      "lastName": "Robinson",
      "streetName": "Second Street",
      "streetNumber": "15",
      "postalCode": "10001",
      "city": "New York City",
      "state": "New York",
      "country": "US"
    },
    "itemShippingAddresses": [],
    "refusedGifts": []
  },
  "createdAt": "2023-11-30T19:09:26.096Z",
  "lastModifiedAt": "2023-11-30T19:09:26.096Z",
  "createdBy": { "clientId": "1q1q1q1q1q" },
  "lastModifiedBy": { "clientId": "1q1q1q1q1q" }
}

export const mockOrderCreatedEventPayloadWithLineItemsEmpty: CtEventPayload = {
  "notificationType": "Message",
  "projectKey": "lucina-connect",
  "id": "11111",
  "version": 1,
  "sequenceNumber": 1,
  "resource": {
    "typeId": "order",
    "id": "11111"
  },
  "resourceVersion": 1,
  "type": "OrderCreated",
  "order": {
    "id": "11111",
    "version": 1,
    "lastMessageSequenceNumber": 1,
    "createdAt": "2023-11-30T19:09:26.066Z",
    "lastModifiedAt": "2023-11-30T19:09:26.066Z",
    "lastModifiedBy": { "clientId": "1q1q1q1q1q" },
    "createdBy": { "clientId": "1q1q1q1q1q" },
    "customerId": "11111",
    "customerEmail": "jen@example.com",
    "totalPrice": {
      "type": "centPrecision",
      "currencyCode": "USD",
      "centAmount": 6000,
      "fractionDigits": 2
    },
    "taxedPrice": {
      "totalNet": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 6000,
        "fractionDigits": 2
      },
      "totalGross": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 6240,
        "fractionDigits": 2
      },
      "taxPortions": [
        {
          "rate": 0.04,
          "amount": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 240,
            "fractionDigits": 2
          },
          "name": "State Tax: New York"
        }
      ],
      "totalTax": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 240,
        "fractionDigits": 2
      }
    },
    "taxedShippingPrice": {
      "totalNet": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 5000,
        "fractionDigits": 2
      },
      "totalGross": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 5200,
        "fractionDigits": 2
      },
      "taxPortions": [
        {
          "rate": 0.04,
          "amount": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 200,
            "fractionDigits": 2
          },
          "name": "State Tax: New York"
        }
      ],
      "totalTax": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 200,
        "fractionDigits": 2
      }
    },
    "orderState": "Open",
    "syncInfo": [],
    "returnInfo": [],
    "taxMode": "Platform",
    "inventoryMode": "ReserveOnOrder",
    "taxRoundingMode": "HalfEven",
    "taxCalculationMode": "LineItemLevel",
    "origin": "Merchant",
    "shippingMode": "Single",
    "shippingInfo": {
      "shippingMethodName": "US Delivery",
      "price": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 5000,
        "fractionDigits": 2
      },
      "shippingRate": {
        "price": {
          "type": "centPrecision",
          "currencyCode": "USD",
          "centAmount": 5000,
          "fractionDigits": 2
        },
        "freeAbove": {
          "type": "centPrecision",
          "currencyCode": "USD",
          "centAmount": 100000,
          "fractionDigits": 2
        },
        "tiers": []
      },
      "taxRate": {
        "name": "State Tax: New York",
        "amount": 0.04,
        "includedInPrice": false,
        "country": "US",
        "state": "New York",
        "id": "6vQNQZKs",
        "key": "ny-state-tax",
        "subRates": []
      },
      "taxCategory": {
        "typeId": "tax-category",
        "id": "11111"
      },
      "deliveries": [],
      "shippingMethod": {
        "typeId": "shipping-method",
        "id": "11111"
      },
      "taxedPrice": {
        "totalNet": {
          "type": "centPrecision",
          "currencyCode": "USD",
          "centAmount": 5000,
          "fractionDigits": 2
        },
        "totalGross": {
          "type": "centPrecision",
          "currencyCode": "USD",
          "centAmount": 5200,
          "fractionDigits": 2
        },
        "totalTax": {
          "type": "centPrecision",
          "currencyCode": "USD",
          "centAmount": 200,
          "fractionDigits": 2
        }
      },
      "shippingMethodState": "MatchesCart"
    },
    "shippingAddress": {
      "id": "3UjigDbr",
      "firstName": "Jennifer",
      "lastName": "Robinson",
      "streetName": "Second Street",
      "streetNumber": "15",
      "postalCode": "10001",
      "city": "New York City",
      "state": "New York",
      "country": "US"
    },
    "shipping": [],
    "lineItems": [],
    "customLineItems": [],
    "discountCodes": [],
    "cart": {
      "typeId": "cart",
      "id": "11111"
    },
    "billingAddress": {
      "id": "3UjigDbr",
      "firstName": "Jennifer",
      "lastName": "Robinson",
      "streetName": "Second Street",
      "streetNumber": "15",
      "postalCode": "10001",
      "city": "New York City",
      "state": "New York",
      "country": "US"
    },
    "itemShippingAddresses": [],
    "refusedGifts": []
  },
  "createdAt": "2023-11-30T19:09:26.096Z",
  "lastModifiedAt": "2023-11-30T19:09:26.096Z",
  "createdBy": { "clientId": "1q1q1q1q1q" },
  "lastModifiedBy": { "clientId": "1q1q1q1q1q" }
}


export const mockProductVariantWithStock: ProductVariant = {
  "id": 1,
  "sku": "WFJM",
  "prices": [
    {
      "id": "12345",
      "value": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 399,
        "fractionDigits": 2
      },
      "country": "US"
    }
  ],
  "images": [
    {
      "url": "https://image.com",
      "dimensions": {
        "w": 5056,
        "h": 4784
      }
    }
  ],
  "attributes": [],
  "assets": [],
  "availability": {
    "isOnStock": true,
    "availableQuantity": 100
  }
}

export const mockProductVariantOutOfStock: ProductVariant = {
  "id": 1,
  "sku": "WFJM",
  "prices": [
    {
      "id": "12345",
      "value": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 399,
        "fractionDigits": 2
      },
      "country": "US"
    }
  ],
  "images": [
    {
      "url": "https://image.com",
      "dimensions": {
        "w": 5056,
        "h": 4784
      }
    }
  ],
  "attributes": [],
  "assets": [],
  "availability": {
    "isOnStock": false,
    "availableQuantity": 0
  }
}