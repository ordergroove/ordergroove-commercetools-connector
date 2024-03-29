# Initial product load job

This process is triggered by the job application, as detailed in the [README](https://github.com/gluo-dev/ordergroove-commercetools-connector/blob/main/README.md#installing-the-connector) file.

As depicted in the image below, the application performs a Product Projections Search to retrieve products with a limit of 100 per request, incorporating the CTP_CURRENCY_CODE configuration into the query, and sorting by 'createdAt asc'. It is crucial to note that if the variables CTP_COUNTRY_CODE and CTP_DISTRIBUTION_CHANNEL_ID are provided in the configuration, they are also included in the query.
 - Note: The query for this search is designed to match a price with the given configuration. If a product variant has a price that aligns with the query arguments, a 'price' attribute is added to the response.

After receiving the response from commercetools, the application initiates a process wherein it systematically processes each product, extracting all variants. Throughout this procedure, various rules are applied to determine whether a product variant will be created in Ordergroove:
 - The product variant must have a name available for the specified language code in the configuration.
 - The product variant must include a 'price' attribute, where this price aligns with the query arguments sent in the request.

 To determine the stock availability of a product variant, several rules are defined:
 - In the absence of the availability attribute for the product variant, it is assumed that the product has stock.
 - If the variable CTP_INVENTORY_SUPPLY_CHANNEL_ID is provided, the stock is sourced from that channel.
 - If the variable CTP_INVENTORY_SUPPLY_CHANNEL_ID is not provided, we assume that the product has stock if at least one inventory has stock.

All valid product variants from the response are added to a list, which is then segmented into batches of 100 products, already formatted for Ordergroove. These batches are then concurrently dispatched in groups of 10 to Ordergroove, in case the initial request attempt fails, a second attempt is made one second later.

Once a batch is sent to Ordergroove, the custom object 'JobStatusSchema' is updated. If there are still products in commercetools to retrieve, the next offset is saved, and the status is set to 'ACTIVE'. Once there are no more products in commercetools, the status is set to 'COMPLETED'.

<img src="https://github.com/gluo-dev/ordergroove-commercetools-connector/blob/main/docs/diagrams/diagram-initial-product-load-job.jpg" />