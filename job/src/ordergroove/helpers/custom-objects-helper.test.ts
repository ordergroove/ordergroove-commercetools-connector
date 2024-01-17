import { CustomObjectDraft, ClientResponse, CustomObject } from '@commercetools/platform-sdk';
import * as CtCustomObjectsApi from '../client/ct-custom-objects-api';
import { isInitialProductLoadExecutable, setInitialProductLoadExecuted } from './custom-objects-helper'

jest.mock('../client/ct-custom-objects-api')

describe('isInitialProductLoadExecutable', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call the service, retrieve an existing custom object, and return false because the initial product load has already been executed.', async () => {
    const customObjectResponse: ClientResponse = {
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

    const getCustomObjectByContainerAndKeySpy = jest
      .spyOn(CtCustomObjectsApi, 'getCustomObjectByContainerAndKey')
      .mockResolvedValue(customObjectResponse)
    
    const result = await isInitialProductLoadExecutable();

    expect(getCustomObjectByContainerAndKeySpy).toHaveBeenCalled()
    expect(result).toBeFalsy()
  })

  it('should call the service, get a 404 error, and return true because the initial product load has not been executed', async () => {
    const NotFoundObj = {
      status: 404,
      message: 'URI not found',
      statusCode: 404
    };

    jest.spyOn(CtCustomObjectsApi, 'getCustomObjectByContainerAndKey')
      .mockImplementation(() => { throw new Object(NotFoundObj) });

    const result = await isInitialProductLoadExecutable();

    expect(result).toBeTruthy()
  })

  it('should call the service, get an unexpected error, and return false because we do not know if the initial product load has been executed.', async () => {
    const NotFoundObj = {
      message: 'Unexpected error'
    };

    jest.spyOn(CtCustomObjectsApi, 'getCustomObjectByContainerAndKey')
      .mockImplementation(() => { throw new Object(NotFoundObj) });

    const result = await isInitialProductLoadExecutable();

    expect(result).toBeFalsy()
  })
})

describe('setInitialProductLoadExecuted', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call the service and create a custom object successfully', async () => {
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

    const createCustomObjectSpy = jest
      .spyOn(CtCustomObjectsApi, 'createCustomObject')
      .mockResolvedValue(customObjectResponse)

    const result = await setInitialProductLoadExecuted();

    expect(createCustomObjectSpy).toHaveBeenCalled()
    expect(result).toBeTruthy()
  })

  it('should call the service, receive an error and return false', async () => {
    const Unauthorized = {
      status: 401,
      message: 'Unauthorized',
      statusCode: 401
    };

    jest.spyOn(CtCustomObjectsApi, 'createCustomObject')
      .mockImplementation(() => { throw new Object(Unauthorized) });

    const result = await setInitialProductLoadExecuted();

    expect(result).toBeFalsy()
  })
})

