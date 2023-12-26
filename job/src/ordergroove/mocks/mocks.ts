import { OrdergrooveProduct } from '../../types/custom.types';
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

export const productProjectionPagedQueryResponse: ProductProjectionPagedQueryResponse = {
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
        "prices": [],
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
          "prices": [],
          "sku": "WFJM"
        }
      ],
      "version": 2
    }
  ],
  "total": 1
};