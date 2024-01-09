# Inventory Entry Subscription

This event in handled in the 'event' application.

As illustrated in the image below, the application receives a message every time an inventory is created, deleted, or updated. Consequently, the application needs to check if there are changes in the product inventory between ordergroove and commercetools to synchronize the information.

Business rules:
 - This process will only update products that already exist in ordergroove.
 - Wait for 10 seconds (strong consistency) before retrieving product information from commercetools.
 - In case the first update attempt fails, initiate a second attempt.

<img src="https://github.com/gluo-dev/ordergroove-commercetools-connector/blob/main/docs/diagrams/diagram-inventory-entry-event.jpg" />