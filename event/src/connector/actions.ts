import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const SUBSCRIPTION_DESTINATION_TYPE = 'GoogleCloudPubSub';
const INVENTORY_ENTRY_SUBSCRIPTION_KEY = 'ordergrooveConnector-inventoryEntrySubscription';
const ORDER_CREATED_SUBSCRIPTION_KEY = 'ordergrooveConnector-orderCreatedSubscription';

export async function createInventoryEntrySubscription(
  apiRoot: ByProjectKeyRequestBuilder,
  topicName: string,
  projectId: string
): Promise<void> {
  const {
    body: { results: subscriptions },
  } = await apiRoot
    .subscriptions()
    .get({
      queryArgs: {
        where: `key = "${INVENTORY_ENTRY_SUBSCRIPTION_KEY}"`,
      },
    })
    .execute();

  if (subscriptions.length > 0) {
    const subscription = subscriptions[0];

    await apiRoot
      .subscriptions()
      .withKey({ key: INVENTORY_ENTRY_SUBSCRIPTION_KEY })
      .delete({
        queryArgs: {
          version: subscription.version,
        },
      })
      .execute();
  }

  await apiRoot
    .subscriptions()
    .post({
      body: {
        key: INVENTORY_ENTRY_SUBSCRIPTION_KEY,
        destination: {
          type: SUBSCRIPTION_DESTINATION_TYPE,
          topic: topicName,
          projectId,
        },
        messages: [
          {
            resourceTypeId: 'inventory-entry',
            types: [],
          },
        ],
      },
    })
    .execute();
}

export async function deleteInventoryEntrySubscription(
  apiRoot: ByProjectKeyRequestBuilder
): Promise<void> {
  const {
    body: { results: subscriptions },
  } = await apiRoot
    .subscriptions()
    .get({
      queryArgs: {
        where: `key = "${INVENTORY_ENTRY_SUBSCRIPTION_KEY}"`,
      },
    })
    .execute();

  if (subscriptions.length > 0) {
    const subscription = subscriptions[0];

    await apiRoot
      .subscriptions()
      .withKey({ key: INVENTORY_ENTRY_SUBSCRIPTION_KEY })
      .delete({
        queryArgs: {
          version: subscription.version,
        },
      })
      .execute();
  }
}

export async function createOrderCreatedSubscription(
  apiRoot: ByProjectKeyRequestBuilder,
  topicName: string,
  projectId: string
): Promise<void> {
  const {
    body: { results: subscriptions },
  } = await apiRoot
    .subscriptions()
    .get({
      queryArgs: {
        where: `key = "${ORDER_CREATED_SUBSCRIPTION_KEY}"`,
      },
    })
    .execute();

  if (subscriptions.length > 0) {
    const subscription = subscriptions[0];

    await apiRoot
      .subscriptions()
      .withKey({ key: ORDER_CREATED_SUBSCRIPTION_KEY })
      .delete({
        queryArgs: {
          version: subscription.version,
        },
      })
      .execute();
  }

  await apiRoot
    .subscriptions()
    .post({
      body: {
        key: ORDER_CREATED_SUBSCRIPTION_KEY,
        destination: {
          type: SUBSCRIPTION_DESTINATION_TYPE,
          topic: topicName,
          projectId,
        },
        messages: [
          {
            resourceTypeId: 'order',
            types: ['OrderCreated'],
          },
        ],
      },
    })
    .execute();
}

export async function deleteOrderCreatedSubscription(
  apiRoot: ByProjectKeyRequestBuilder
): Promise<void> {
  const {
    body: { results: subscriptions },
  } = await apiRoot
    .subscriptions()
    .get({
      queryArgs: {
        where: `key = "${ORDER_CREATED_SUBSCRIPTION_KEY}"`,
      },
    })
    .execute();

  if (subscriptions.length > 0) {
    const subscription = subscriptions[0];

    await apiRoot
      .subscriptions()
      .withKey({ key: ORDER_CREATED_SUBSCRIPTION_KEY })
      .delete({
        queryArgs: {
          version: subscription.version,
        },
      })
      .execute();
  }
}
