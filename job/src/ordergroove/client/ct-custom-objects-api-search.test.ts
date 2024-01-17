import { getCustomObjectByContainerAndKey } from './ct-custom-objects-api'

const customObjectResponse = {
  "body": {
    "id": '11111',
    "version": 1,
    "versionModifiedAt": '2024-01-17T17:12:50.177Z',
    "createdAt": '2024-01-17T17:12:50.177Z',
    "lastModifiedAt": '2024-01-17T17:12:50.177Z',
    "lastModifiedBy": { "clientId": 'arh-11111', "isPlatformClient": false },
    "createdBy": { "clientId": 'arh-11111', "isPlatformClient": false },
    "container": 'myContainer',
    "key": 'mySchema',
    "value": { "executed": true }
  },
  "statusCode": 200
}

const mockedExecute = jest.fn().mockReturnValue({ body: customObjectResponse })
jest.mock('../../client/create.client', () => {
  return {
    createApiRoot: jest.fn().mockImplementation(() => ({
      customObjects: jest.fn().mockReturnValue({
        withContainerAndKey: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue({
            execute: mockedExecute
          })
        })
      })
    }))
  }
})

describe('getCustomObjectByContainerAndKey', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call the Commercetools API with the correct parameters and get the custom object', async () => {
    await getCustomObjectByContainerAndKey('myContainer', 'mySchema')

    expect(mockedExecute).toHaveBeenCalledTimes(1)
    expect(mockedExecute).toHaveReturned()
    expect(mockedExecute).toHaveReturnedWith({ "body": customObjectResponse })
  })
})
