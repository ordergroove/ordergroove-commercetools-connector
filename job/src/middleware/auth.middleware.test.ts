import { createAuthMiddlewareOptions } from './auth.middleware'
import* as ConfigUtils from '../utils/config.utils'

const mockConfiguration = {
  region: 'test-region',
  projectKey: 'test-project',
  clientId: 'test-client-id',
  clientSecret: 'test-client-secret',
  scope: undefined,
  languageCode: 'en-US',
  currencyCode: 'USD',
  countryCode: 'mockCountryCode',
  distributionChannelId: 'mockDistributionChannelId',
  inventorySupplyChannelId: 'mockInventorySupplyChannelId',
  ordergrooveApiKey: 'ordergrooveApiKey'
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
    countryCode: 'US',
    distributionChannelId: '',
    inventorySupplyChannelId: '',
    ordergrooveApiKey: 'ordergrooveApiKey'
  }),
}))

describe('createAuthMiddlewareOptions configuration', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })



  it('should use default scope when scope is not provided in configuration', () => {
    jest.spyOn(ConfigUtils, 'readConfiguration').mockReturnValue(
      {
        region: 'test-region',
        projectKey: 'test-project',
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret',
        scope: undefined,
        languageCode: 'en-US',
        currencyCode: 'USD',
        countryCode: 'US',
        distributionChannelId: '',
        inventorySupplyChannelId: '',
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

  it('should use the scope provided in the configuration', () => {
    jest.spyOn(ConfigUtils, 'readConfiguration').mockReturnValue(
      {
        region: 'test-region',
        projectKey: 'test-project',
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret',
        scope: 'test-scope',
        languageCode: 'en-US',
        currencyCode: 'USD',
        countryCode: 'US',
        distributionChannelId: '',
        inventorySupplyChannelId: '',
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
      scopes: ['test-scope'],
    }

    const result = createAuthMiddlewareOptions();

    expect(result).toEqual(expectedAuthMiddlewareOptions)
  })
})
