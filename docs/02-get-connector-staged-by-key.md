# Query ConnectorStaged

```bash
curl --get https://connect.us-central1.gcp.commercetools.com/connectors/drafts/key=ordergroove-connector \
--header 'Authorization: Bearer {{ token }}' | json_pp
```

You'll get something like this:

```json
{
    "id": "6c5d756d-db6c-4cd8-aa1f-831ed9eb5cbc",
    "key": "ordergroove-connector",
    "version": 410,
    "name": "ordergroove connector",
    "description": "Connector to sync products",
    "creator": {
        "name": "IT",
        "email": "it@gluo.mx",
        "company": "Gluo",
        "title": "Mr"
    },
    "repository": {
        "tag": "17-01-2024_1",
        "url": "https://github.com/gluo-dev/ordergroove-commercetools-connector.git"
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
    "private": true,
    "supportedRegions": [
        "us-central1.gcp",
        "europe-west1.gcp",
        "australia-southeast1.gcp"
    ],
    "hasChanges": true,
    "alreadyListed": false,
    "status": "Draft",
    "isPreviewable": "pending"
}
```