# Inventory Entry Subscription

This event is handled in the 'event' application.

As depicted in the image below, the application receives a message every time an inventory is created, deleted, or updated. Consequently, the application checks for changes in the product inventory between ordergroove and commercetools in order to synchronize the information.

Business rules:
 - This process will only update products that already exist in ordergroove.
 - Wait for 10 seconds (strong consistency) before retrieving product information from commercetools.
 - Request an update only if there is a difference in inventory between ordergroove and commercetools.
 - In case the first update attempt fails, initiate a second attempt.

<img src="https://github.com/gluo-dev/ordergroove-commercetools-connector/blob/main/docs/diagrams/diagram-inventory-entry-event.jpg" />