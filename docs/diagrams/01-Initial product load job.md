# Initial product load job

This process is triggered by an HTTP request, as detailed in the README file.

As illustrated in the image below, the application performs a Product Projections Search to retrieve products with a limit of 100 per request, incorporating the CTP_CURRENCY_CODE configuration into the query. It is crucial to note that if the variables CTP_COUNTRY_CODE and CTP_DISTRIBUTION_CHANNEL_ID are provided in the configuration, they are also included in the query.

After receiving the response from Commercetools, the application initiates a process wherein it systematically processes each product, extracting all variants. Throughout this procedure, various rules are applied to determine whether a product variant will be created in Ordergroove:
 - The product variant must have a name available for the specified language code in the configuration.
 - The product variant must include a 'scopedPrice' attribute, where this price aligns with the query arguments sent in the request.

All valid product variants from the response are added to a list, which is then segmented into batches of 100 products, already formatted for ordergroove. These batches are then concurrently dispatched in groups of 10 to ordergroove, in case the initial request attempt fails, a second attempt is made one second later.

<img src="https://github.com/gluo-dev/ordergroove-commercetools-connector/blob/main/docs/diagrams/Diagram%20-%20Initial%20product%20load.jpg" />