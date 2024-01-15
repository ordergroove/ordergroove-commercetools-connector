# Create a ConnectorStaged

ConnectorStaged is how non-certified versions of Connectors are stored. Even after being certified and listed, a ConnectorStaged can be modified (to fix bugs and add new features) and re-certified to update the production Connector.

ConnectorStaged are created by posting a ConnectorStagedDraft to the /connectors/drafts endpoint.

```bash
curl --location 'https://connect.us-central1.gcp.commercetools.com/connectors/drafts' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{ token }}' \
--data-raw '{
    "key": "ordergroove-connector",
    "name": "Ordergroove connector",
    "description": "Connector to sync products",
    "creator": {
        "title": "Mr",
        "name": "IT",
        "email": "it@gluo.mx",
        "company": "Gluo",
        "noOfDevelopers": 1
    },
    "repository": {
        "url": "https://github.com/gluo-dev/ordergroove-commercetools-connector.git",
        "tag": "certification_15-01-2024_1"
    },
    "privateProjects": [],
    "supportedRegions": [
        "us-central1.gcp"
    ]
}'
```