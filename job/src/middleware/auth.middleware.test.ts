import { createAuthMiddlewareOptions } from './auth.middleware'
import* as ConfigUtils from '../utils/config.utils';

const mockConfiguration = {
  region: 'test-region',
  projectKey: 'test-project',
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
  scope: undefined,
}

jest.mock('../utils/config.utils', () => ({
  readConfiguration: jest.fn().mockReturnValue({
    region: 'test-region',
    projectKey: 'test-project',
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
    scope: undefined,
    languageCode: 'en-US',
    currencyCode: 'USD',
    ordergrooveApiKey: 'ordergrooveApiKey'
  }),
}))

describe('createAuthMiddlewareOptions configuration', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })



  it('should use default scope when scope is not provided in configuration', () => {
    const processProductPublishedEventSpy = jest
      .spyOn(ConfigUtils, 'readConfiguration').mockReturnValue(
        {
          region: 'test-region',
          projectKey: 'test-project',
          clientId: 'test-client-id',
          clientSecret: 'test-client-secret',
          scope: undefined,
          languageCode: 'en-US',
          currencyCode: 'USD',
          ordergrooveApiKey: 'ordergrooveApiKey'
        }
      )

    const expectedAuthMiddlewareOptions = {
      host: `https://auth.${mockConfiguration.region}.commercetools.com`,
      projectKey: mockConfiguration.projectKey,
      credentials: {
        clientId: mockConfiguration.clientId,
        clientSecret: mockConfiguration.clientSecret,
      },
      scopes: ['default'],
    }

    const result = createAuthMiddlewareOptions();

    expect(result).toEqual(expectedAuthMiddlewareOptions)
  })
})
