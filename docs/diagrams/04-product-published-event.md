# Product Published Subscription

This event is handled in the 'event' application.

As depicted in the image below, the application receives a message each time a product is published in commercetools. Consequently, the application performs a Product Projections Search by sku (uses the master variant sku) incorporating the CTP_CURRENCY_CODE configuration into the query. It is crucial to note that if the variables CTP_COUNTRY_CODE and CTP_DISTRIBUTION_CHANNEL_ID are provided in the configuration, they are also included in the query.
 - Note: The query for this search is designed to match a price with the given configuration. If a product variant has a price that aligns with the query arguments, a 'scopedPrice' attribute is added to the response.

 After receiving the response from commercetools, the application initiates a process wherein it systematically processes each product, extracting all variants. Throughout this procedure, various rules are applied to determine whether a product variant will be created or updated in Ordergroove:
 - The product variant must have a name available for the specified language code in the configuration.
 - The product variant must include a 'scopedPrice' attribute, where this price aligns with the query arguments sent in the request.

To determine the stock availability of a product variant, several rules are defined:
 - In the absence of the availability attribute for the product variant, it is assumed that the product has stock.
 - If the variable CTP_INVENTORY_SUPPLY_CHANNEL_ID is provided, the stock is sourced from that channel.
 - If the variable CTP_INVENTORY_SUPPLY_CHANNEL_ID is not provided, we assume that the product has stock if at least one inventory has stock.

 All valid product variants from the response are added to a list. Subsequently, these products are retrieved from Ordergroove. If the product does not exist in Ordergroove, a create request is sent. If the product already exists, the information between the two platforms is compared to determine if an update is needed.

 In case the initial create/update request attempt fails, a second attempt is made.

<img src="https://github.com/gluo-dev/ordergroove-commercetools-connector/blob/main/docs/diagrams/diagram-product-published-event.jpg" />