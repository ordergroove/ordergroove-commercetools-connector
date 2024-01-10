# Order Created Subscription

This event is handled in the 'event' application.

As depicted in the image below, the application receives a message each time an order is created in commercetools. Consequently, the application checks for changes in the product inventory between ordergroove and commercetools in order to synchronize the information for every line item in the order.

Business rules:
 - Only orders with 'inventoryMode' set to 'TrackOnly' or 'ReserveOnOrder' will be processed.
 - This process will only update products that already exist in ordergroove.
 - Wait for 10 seconds (strong consistency) before retrieving product information from commercetools.
 - Request an update only if there is a difference in inventory between ordergroove and commercetools.
 - In case the first update attempt fails, initiate a second attempt.

<img src="https://github.com/gluo-dev/ordergroove-commercetools-connector/blob/main/docs/diagrams/diagram-order-created-event.jpg" />