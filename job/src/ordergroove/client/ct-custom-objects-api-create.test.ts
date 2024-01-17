import { CustomObjectDraft } from '@commercetools/platform-sdk';

import { createCustomObject } from './ct-custom-objects-api'

const customObjectResponse = {
  "body": {
    "id": '11111',
    "version": 1,
    "versionModifiedAt": '2024-01-17T18:38:16.423Z',
    "createdAt": '2024-01-17T18:38:16.423Z',
    "lastModifiedAt": '2024-01-17T18:38:16.423Z',
    "lastModifiedBy": { "clientId": 'arh-11111', "isPlatformClient": false },
    "createdBy": { "clientId": 'arh-11111', "isPlatformClient": false },
    "container": 'myContainer',
    "key": 'mySchema',
    "value": { "executed": true }
  },
  "statusCode": 201
}

const mockedExecute = jest.fn().mockReturnValue({ body: customObjectResponse })
jest.mock('../../client/create.client', () => {
  return {
    createApiRoot: jest.fn().mockImplementation(() => ({
      customObjects: jest.fn().mockReturnValue({
        post: jest.fn().mockReturnValue({
          execute: mockedExecute
        })
      })
    }))
  }
})

describe('createCustomObject', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call the Commercetools API with the correct parameters and create the custom object', async () => {
    const schemaObject: CustomObjectDraft = {
      container: 'myContainer',
      key: 'mySchema',
      value: {
        "executed": true
      }
    }

    await createCustomObject(schemaObject)

    expect(mockedExecute).toHaveBeenCalledTimes(1)
    expect(mockedExecute).toHaveReturned()
    expect(mockedExecute).toHaveReturnedWith({ "body": customObjectResponse })
  })
})
