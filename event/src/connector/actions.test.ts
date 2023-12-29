import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder'
import {
  MY_SUBSCRIPTION_KEY,
  createOrdergrooveConnectorSubscription,
  deleteOrdergrooveConnectorSubscription
} from './actions'

describe('createOrdergrooveConnectorSubscription', () => {
  let mockDeletefn: typeof jest.fn
  let mockPostfn: typeof jest.fn
  let mockApiRoot: ByProjectKeyRequestBuilder

  const mockGetResponse = {
    body: {
      results: [{ version: 1 }],
    },
  }

  beforeEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()

    mockDeletefn = jest.fn().mockReturnThis()
    mockPostfn = jest.fn().mockReturnThis()
    mockApiRoot = {
      subscriptions: jest.fn().mockReturnThis(),
      get: jest.fn().mockReturnThis(),
      withKey: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue(mockGetResponse),
      delete: mockDeletefn,
      post: mockPostfn,
    } as unknown as ByProjectKeyRequestBuilder
  })

  it('should delete an existing subscription if one exists', async () => {
    await createOrdergrooveConnectorSubscription(mockApiRoot, 'topicName', 'projectId')

    expect(mockDeletefn).toHaveBeenCalledWith({
      queryArgs: { version: 1 },
    })
    expect(mockPostfn).toHaveBeenCalledWith({
      body: {
        key: MY_SUBSCRIPTION_KEY,
        destination: {
          projectId: 'projectId',
          topic: 'topicName',
          type: 'GoogleCloudPubSub',
        },
        format: {
          type: 'CloudEvents',
          cloudEventsVersion: '1.0',
        },
        messages: [
          {
            resourceTypeId: 'inventory-entry',
            types: [],
          },
          {
            resourceTypeId: 'order',
            types: ['OrderCreated'],
          },
          {
            resourceTypeId: 'product',
            types: ['ProductPublished'],
          }
        ],
      },
    })
  })
  it('should POST with expected body', async () => {
    await createOrdergrooveConnectorSubscription(mockApiRoot, 'topicName', 'projectId')

    expect(mockPostfn).toHaveBeenCalledWith({
      body: {
        key: MY_SUBSCRIPTION_KEY,
        destination: {
          projectId: 'projectId',
          topic: 'topicName',
          type: 'GoogleCloudPubSub',
        },
        format: {
          type: 'CloudEvents',
          cloudEventsVersion: '1.0',
        },
        messages: [
          {
            resourceTypeId: 'inventory-entry',
            types: [],
          },
          {
            resourceTypeId: 'order',
            types: ['OrderCreated'],
          },
          {
            resourceTypeId: 'product',
            types: ['ProductPublished'],
          }
        ],
      },
    })
  })
})

describe('deleteOrdergrooveConnectorSubscription', () => {
  let mockDeletefn: typeof jest.fn
  let mockApiRoot: ByProjectKeyRequestBuilder

  const mockGetResponse = {
    body: {
      results: [{ version: 1 }],
    },
  }

  beforeEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
    mockDeletefn = jest.fn().mockReturnThis()
    mockApiRoot = {
      subscriptions: jest.fn().mockReturnThis(),
      get: jest.fn().mockReturnThis(),
      withKey: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue(mockGetResponse),
      delete: mockDeletefn,
    } as unknown as ByProjectKeyRequestBuilder
  })

  it('should delete a subscription', async () => {
    await deleteOrdergrooveConnectorSubscription(mockApiRoot)

    expect(mockDeletefn).toHaveBeenCalledWith({
      queryArgs: { version: 1 },
    })
  })
})
