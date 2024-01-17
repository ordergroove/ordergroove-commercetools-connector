# Create a Deployment

Deployments are created by posting a DeploymentDraft to the Deployments endpoint.

You must include a reference to the Connector that will be deployed (using the Connector's `id` or `key` and `version`), the Region where the deployment will be made, and also the environment variables necessary for the Connector to operate. It is recommended to include a key to identify your Deployment.

```bash
curl --location 'https://connect.us-central1.gcp.commercetools.com/{{ PROJECT-KEY }}/deployments' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{ token }}' \
--data-raw '{
  "key": "ordergroove-connector-deployment",
  "connector": {
    "key": "ordergroove-connector",
    "staged": true,
    "version": 1
  },
  "region": "us-central1.gcp",
  "configurations": [
    {
      "applicationName": "event",
      "standardConfiguration": [
        {
          "key": "CTP_REGION",
          "value": "us-central1.gcp"
        },
        {
            "key": "CTP_LANGUAGE_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_CURRENCY_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_COUNTRY_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_DISTRIBUTION_CHANNEL_ID",
            "value": "{{ ID }}"
        },
        {
            "key": "CTP_INVENTORY_SUPPLY_CHANNEL_ID",
            "value": "{{ ID }}"
        },
        {
            "key": "OG_API_URL",
            "value": "https://restapi.ordergroove.com"
        },
        {
            "key": "PRODUCT_STORE_URL",
            "value": "{{ URL }}"
        }
      ],
      "securedConfiguration": [
        {
          "key": "CTP_PROJECT_KEY",
          "value": "{{ KEY }}"
        },
        {
          "key": "CTP_CLIENT_ID",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_CLIENT_SECRET",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_SCOPE",
          "value": "{{ SCOPE }}"
        },
        {
            "key": "OG_API_KEY",
            "value": "{{ SECRET }}"
        }
      ]
    },
    {
      "applicationName": "job",
      "standardConfiguration": [
        {
          "key": "CTP_REGION",
          "value": "us-central1.gcp"
        },
        {
            "key": "CTP_LANGUAGE_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_CURRENCY_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_COUNTRY_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_DISTRIBUTION_CHANNEL_ID",
            "value": "{{ ID }}"
        },
        {
            "key": "CTP_INVENTORY_SUPPLY_CHANNEL_ID",
            "value": "{{ ID }}"
        },
        {
            "key": "OG_API_URL",
            "value": "https://restapi.ordergroove.com"
        },
        {
            "key": "PRODUCT_STORE_URL",
            "value": "{{ URL }}"
        }
      ],
      "securedConfiguration": [
        {
          "key": "CTP_PROJECT_KEY",
          "value": "{{ KEY }}"
        },
        {
          "key": "CTP_CLIENT_ID",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_CLIENT_SECRET",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_SCOPE",
          "value": "{{ SCOPE }}"
        },
        {
            "key": "OG_API_KEY",
            "value": "{{ SECRET }}"
        }
      ]
    }
  ]
}'
```

You'll get something like this:

```json
{
    "id": "d579a7c0-a240-4ca0-8a5e-8f7de3a218ac",
    "key": "ordergroove-connector-deploy",
    "version": 1,
    "connector": {
        "id": "6c5d756d-db6c-4cd8-aa1f-831ed9eb5cbc",
        "version": 412,
        "name": "ordergroove connector",
        "description": "Connector to sync products",
        "creator": {
            "name": "IT",
            "title": "Mr",
            "email": "it@gluo.mx",
            "company": "Gluo"
        },
        "repository": {
            "url": "https://github.com/gluo-dev/ordergroove-commercetools-connector.git",
            "tag": "17-01-2024_1"
        },
        "configurations": [
            {
                "applicationName": "job",
                "applicationType": "job",
                "securedConfiguration": [
                    {
                        "key": "CTP_PROJECT_KEY",
                        "description": "commercetools Composable Commerce project key",
                        "required": true
                    },
                    {
                        "key": "CTP_CLIENT_ID",
                        "description": "commercetools Composable Commerce client ID",
                        "required": true
                    },
                    {
                        "key": "CTP_CLIENT_SECRET",
                        "description": "commercetools Composable Commerce client secret",
                        "required": true
                    },
                    {
                        "key": "CTP_SCOPE",
                        "description": "commercetools Composable Commerce client scope",
                        "required": true
                    },
                    {
                        "key": "OG_API_KEY",
                        "description": "Ordergroove API key",
                        "required": true
                    }
                ],
                "standardConfiguration": [
                    {
                        "key": "CTP_REGION",
                        "description": "commercetools Composable Commerce API region",
                        "required": true
                    },
                    {
                        "key": "CTP_LANGUAGE_CODE",
                        "description": "commercetools Composable Commerce language code",
                        "required": true
                    },
                    {
                        "key": "CTP_CURRENCY_CODE",
                        "description": "commercetools Composable Commerce currency code",
                        "required": true
                    },
                    {
                        "key": "CTP_COUNTRY_CODE",
                        "description": "commercetools Composable Commerce country code",
                        "required": false
                    },
                    {
                        "key": "CTP_DISTRIBUTION_CHANNEL_ID",
                        "description": "commercetools Composable Commerce product distribution channel ID",
                        "required": false
                    },
                    {
                        "key": "CTP_INVENTORY_SUPPLY_CHANNEL_ID",
                        "description": "commercetools Composable Commerce inventory supply channel ID",
                        "required": false
                    },
                    {
                        "key": "OG_API_URL",
                        "description": "Ordergroove API URL",
                        "required": true
                    },
                    {
                        "key": "PRODUCT_STORE_URL",
                        "description": "Url of the product in the store, with dynamic slug",
                        "required": false
                    },
                    {
                        "key": "PRODUCT_VARIANTS_LIMIT",
                        "description": "Specifies the limit of product variants to send to Ordergroove",
                        "required": false
                    }
                ]
            },
            {
                "applicationName": "event",
                "applicationType": "event",
                "securedConfiguration": [
                    {
                        "key": "CTP_PROJECT_KEY",
                        "description": "commercetools Composable Commerce project key",
                        "required": true
                    },
                    {
                        "key": "CTP_CLIENT_ID",
                        "description": "commercetools Composable Commerce client ID",
                        "required": true
                    },
                    {
                        "key": "CTP_CLIENT_SECRET",
                        "description": "commercetools Composable Commerce client secret",
                        "required": true
                    },
                    {
                        "key": "CTP_SCOPE",
                        "description": "commercetools Composable Commerce client scope",
                        "required": true
                    },
                    {
                        "key": "OG_API_KEY",
                        "description": "Ordergroove API key",
                        "required": true
                    }
                ],
                "standardConfiguration": [
                    {
                        "key": "CTP_REGION",
                        "description": "commercetools Composable Commerce API region",
                        "required": true
                    },
                    {
                        "key": "CTP_LANGUAGE_CODE",
                        "description": "commercetools Composable Commerce language code",
                        "required": true
                    },
                    {
                        "key": "CTP_CURRENCY_CODE",
                        "description": "commercetools Composable Commerce currency code",
                        "required": true
                    },
                    {
                        "key": "CTP_COUNTRY_CODE",
                        "description": "commercetools Composable Commerce country code",
                        "required": false
                    },
                    {
                        "key": "CTP_DISTRIBUTION_CHANNEL_ID",
                        "description": "commercetools Composable Commerce product distribution channel ID",
                        "required": false
                    },
                    {
                        "key": "CTP_INVENTORY_SUPPLY_CHANNEL_ID",
                        "description": "commercetools Composable Commerce inventory supply channel ID",
                        "required": false
                    },
                    {
                        "key": "OG_API_URL",
                        "description": "Ordergroove API URL",
                        "required": true
                    },
                    {
                        "key": "PRODUCT_STORE_URL",
                        "description": "Url of the product in the store, with dynamic slug",
                        "required": false
                    }
                ]
            }
        ],
        "supportedRegions": [
            "us-central1.gcp",
            "europe-west1.gcp",
            "australia-southeast1.gcp"
        ],
        "certified": false
    },
    "deployedRegion": "europe-west1.gcp",
    "applications": [
        {
            "id": "375b85bb-b078-4459-ba06-5c488fc4213b",
            "applicationName": "event",
            "standardConfiguration": [
                {
                    "key": "CTP_REGION",
                    "value": "europe-west1.gcp"
                },
                {
                    "key": "CTP_LANGUAGE_CODE",
                    "value": "en"
                },
                {
                    "key": "CTP_CURRENCY_CODE",
                    "value": "USD"
                },
                {
                    "key": "CTP_COUNTRY_CODE",
                    "value": "US"
                },
                {
                    "key": "CTP_DISTRIBUTION_CHANNEL_ID",
                    "value": "2831244b-56bf-42eb-ae9f-04cfa06c8dcd"
                },
                {
                    "key": "CTP_INVENTORY_SUPPLY_CHANNEL_ID",
                    "value": "2831244b-56bf-42eb-ae9f-04cfa06c8dcd"
                },
                {
                    "key": "OG_API_URL",
                    "value": "https://staging.restapi.ordergroove.com"
                },
                {
                    "key": "PRODUCT_STORE_URL",
                    "value": "https://www.store.gluo.com/[SLUG]"
                }
            ],
            "securedConfiguration": [
                {
                    "key": "CTP_PROJECT_KEY",
                    "value": "********************"
                },
                {
                    "key": "CTP_CLIENT_ID",
                    "value": "************************"
                },
                {
                    "key": "CTP_CLIENT_SECRET",
                    "value": "********************************"
                },
                {
                    "key": "CTP_SCOPE",
                    "value": "***********************************"
                },
                {
                    "key": "OG_API_KEY",
                    "value": "****************************************************************************************"
                }
            ]
        },
        {
            "id": "8655434c-da19-41b4-935d-b3dc1a783fc4",
            "applicationName": "job",
            "standardConfiguration": [
                {
                    "key": "CTP_REGION",
                    "value": "europe-west1.gcp"
                },
                {
                    "key": "CTP_LANGUAGE_CODE",
                    "value": "en"
                },
                {
                    "key": "CTP_CURRENCY_CODE",
                    "value": "USD"
                },
                {
                    "key": "CTP_COUNTRY_CODE",
                    "value": "US"
                },
                {
                    "key": "CTP_DISTRIBUTION_CHANNEL_ID",
                    "value": "2831244b-56bf-42eb-ae9f-04cfa06c8dcd"
                },
                {
                    "key": "CTP_INVENTORY_SUPPLY_CHANNEL_ID",
                    "value": "2831244b-56bf-42eb-ae9f-04cfa06c8dcd"
                },
                {
                    "key": "OG_API_URL",
                    "value": "https://staging.restapi.ordergroove.com"
                },
                {
                    "key": "PRODUCT_STORE_URL",
                    "value": "https://www.store.gluo.com/[SLUG]"
                },
                {
                    "key": "PRODUCT_VARIANTS_LIMIT",
                    "value": "100000"
                }
            ],
            "securedConfiguration": [
                {
                    "key": "CTP_PROJECT_KEY",
                    "value": "********************"
                },
                {
                    "key": "CTP_CLIENT_ID",
                    "value": "************************"
                },
                {
                    "key": "CTP_CLIENT_SECRET",
                    "value": "********************************"
                },
                {
                    "key": "CTP_SCOPE",
                    "value": "***********************************"
                },
                {
                    "key": "OG_API_KEY",
                    "value": "****************************************************************************************"
                }
            ]
        }
    ],
    "details": {},
    "preview": true,
    "status": "Deploying"
}
```