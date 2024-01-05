# Ordergroove commercetools connector

<img height="110" src="https://github.com/gluo-dev/ordergroove-commercetools-connector/blob/main/_logos.svg" />

The Ordergroove commercetools connector was created by [Gluo](https://gluo.mx/), and provides the following features:

- Ability to initially load all products from commercetools to Ordergroove after installing the connector.
- Ability to synchronize products from commercetools to Ordergroove when a product is added or modified.
- Ability to synchronize inventory from commercetools to Ordergroove when an Inventory Entry in commercetools is created, deleted, or modified. Or, in the case of an Order, modify the stock from one or more variants.

## Overview

This connector syncs commercetools products with Ordergroove.

Upon deployment of this connector, your commercetools _products_ can be imported into Ordergroove.

For every product (or variant) modification, the information will be synchronized with Ordergroove.

When the product stock changes or an order is created on commercetools, this information will be synchronized with Ordergroove.

## Pre-requisites

- commercetools Account
- [commercetools API keys](https://docs.commercetools.com/getting-started/create-api-client) (“Admin client”)
- Ordergroove Account
- [Ordergroove Production API keys](https://rc3.ordergroove.com/keys/) or [Ordergroove Staging API keys](https://rc3.stg.ordergroove.com/keys/) (with Bulk Operations permissions)

## Installing the connector

To install the connector in your commercetools project, you'll need to deploy it. Refer to the [commercetools connect deployment documentation](https://docs.commercetools.com/connect/concepts#deployments).

Setup the required environment variables when you [create the deployment](https://docs.commercetools.com/connect/getting-started#create-a-deployment):

- `CTP_PROJECT_KEY`
  - (*Required*) ct project key
- `CTP_CLIENT_ID`
  - (*Required*) ct client ID
- `CTP_CLIENT_SECRET`
  - (*Required*) ct client secret
- `CTP_SCOPE`
  - (*Required*) ct scope
- `CTP_REGION`
  - (*Required*) ct region
- `CTP_LANGUAGE_CODE`
  - (*Required*) This variable will determine the locale to obtain names, descriptions, and other product attributes.
- `CTP_CURRENCY_CODE`
  - (*Required*)This variable will determine which ct embedded price will be sent to Ordergroove.
- `CTP_COUNTRY_CODE`
  - (*Optional*) This variable will determine which ct embedded price will be sent to Ordergroove.
- `CTP_DISTRIBUTION_CHANNEL_ID`
  - (*Optional*) This variable will determine which ct embedded price will be sent to Ordergroove.
- `CTP_INVENTORY_SUPPLY_CHANNEL_ID`
  - (*Optional*) This variable will determine which Inventory Entry will be used to obtain the stock for the Product in commercetools.
- `PRODUCT_STORE_URL`
  - (*Optional*) Url of the store's product detail page (PDP), with a dynamic slug. The PDP URL will not be sent to Ordergroove if this value is not provided.
- `OG_API_URL`
  - (*Required*) Ordergroove API url endpoint.
- `OG_API_KEY`
  - (*Required*) Ordergroove API key.

Once the connector is deployed, you should be able to invoke the job to import all the products from commercetools into Ordergroove:
 - Get the job application ID (JOB-APP-ID): Request your commercetools deployments, identify the connector in the response, and within the "applications" attribute, locate the job application, then copy its ID.
 - Construct the URL to invoke the job using the following template:
   https://job-{JOB-APP-ID}.{region}.commercetools.app/job?startUpload=true
     - Query Param startUpload: This must be set to 'true' to initiate the product load to Ordergroove.
 - Invoke the URL with a POST request, set the Authorization header with a valid commercetools token.
 - Follow the process outlined in the deployment logs.

On the other hand, the connector will create a subscription to listen for the following events ([messages](https://docs.commercetools.com/api/projects/messages)):

- [Product Published](https://docs.commercetools.com/api/projects/messages#product-published)
  - For every product modification, the connector will synchronize between commercetools and ordergroove.
- [Order Created](https://docs.commercetools.com/api/projects/messages#order-created)
  - Each time an order is created, the connector will validate if there is stock for the Product.
- [Inventory Entry Quantity Set](https://docs.commercetools.com/api/projects/messages#inventoryentry-quantity-set)
- [Inventory Entry Deleted](https://docs.commercetools.com/api/projects/messages#inventoryentry-deleted)
- [Inventory Entry Created](https://docs.commercetools.com/api/projects/messages#inventoryentry-created)

## Uninstalling the connector

To uninstall the connector, you must [send the appropriate HTTP request and delete it](https://docs.commercetools.com/connect/deployments#delete-deployment).

This will trigger the [`preUndeploy` script](https://docs.commercetools.com/connect/convert-existing-integration#preundeploy), which will delete the Import cron jobs and messages subscriptions described on the "Installing the connector" section.

## Caveats

- Ordergroove can handle 100 products per call for bulk creation and update operations. This operation can have a throughput of 600 req/min.
- The connector only works with commercetools embedded prices.
- A variant (Product) in commercetools can have up to 100 prices, and we can only send one price to Ordergroove. To select which price we will send, the connector will use the following Environment variables: CTP_CURRENCY_CODE, CTP_COUNTRY_CODE, and CTP_DISTRIBUTION_CHANNEL_ID. Only the CTP_CURRENCY_CODE is required, but the price will be selected depending on the combination of the values. If there is no price selection with the combination of the corresponding values, then the Product will not be created or updated, and a corresponding message will be sent into the logs.

## FAQ

### What is the `PRODUCT_STORE_URL` env variable for?

Ordergroove needs the URL to redirect to the product detail page in your store. To achieve this, commercetools will use `PRODUCT_STORE_URL` to create the dynamic URL using the product slug. For example, you can set a value similar to:

https://www.my-store.com/detail/[SLUG]

[SLUG] will be replaced dynamically with the commercetools product slug being processed.

## Useful links

- https://developer.ordergroove.com/reference/introduction
