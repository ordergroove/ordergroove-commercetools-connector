import CustomError from '../errors/custom.error';
import { readConfiguration } from './config.utils';
import * as validatorHelper from '../validators/helpers.validators';

// Mock process.env properties
const mockEnv = {
  CTP_CLIENT_ID: 'mockClientId',
  CTP_CLIENT_SECRET: 'mockClientSecret',
  CTP_PROJECT_KEY: 'mockProjectKey',
  CTP_SCOPE: 'mockScope',
  CTP_REGION: 'mockRegion',
  CTP_LANGUAGE_CODE: 'mockLanguageCode',
  CTP_CURRENCY_CODE: 'mockCurrencyCode',
  CTP_COUNTRY_CODE: 'mockCountryCode',
  CTP_DISTRIBUTION_CHANNEL_ID: 'mockDistributionChannelId',
  CTP_INVENTORY_SUPPLY_CHANNEL_ID: 'mockInventorySupplyChannelId',
  OG_API_URL: 'https://api',
  OG_API_KEY: 'mockOrdergrooveApiKey'
};

const mockEnv2 = {
  CTP_CLIENT_ID: 'mockClientId',
  CTP_CLIENT_SECRET: 'mockClientSecret',
  CTP_PROJECT_KEY: 'mockProjectKey',
  CTP_SCOPE: 'mockScope',
  CTP_REGION: 'mockRegion',
  CTP_LANGUAGE_CODE: 'en-US',
  CTP_CURRENCY_CODE: 'USD',
  OG_API_URL: 'https://api',
  OG_API_KEY: 'mock-og-api-key'
};

describe('readConfiguration', () => {
  it('should return the correct configuration when env variables are valid', () => {
    process.env = mockEnv
    const expectedConfig = {
      clientId: 'mockClientId',
      clientSecret: 'mockClientSecret',
      projectKey: 'mockProjectKey',
      scope: 'mockScope',
      region: 'mockRegion',
      languageCode: 'mockLanguageCode',
      currencyCode: 'mockCurrencyCode',
      countryCode: 'mockCountryCode',
      distributionChannelId: 'mockDistributionChannelId',
      inventorySupplyChannelId: 'mockInventorySupplyChannelId',
      ordergrooveApiUrl: 'https://api',
      ordergrooveApiKey: 'mockOrdergrooveApiKey'
    };

    // Mock the validation function to return an empty array (no errors)
    jest.spyOn(validatorHelper, 'getValidateMessages').mockReturnValue([]);

    const config = readConfiguration();
    expect(config).toEqual(expectedConfig);
  })

  it('should throw a CustomError when env variables are invalid', () => {
    process.env = mockEnv
    // Mock the validation function to return validation errors
    jest
      .spyOn(validatorHelper, 'getValidateMessages')
      .mockReturnValue(['Invalid variable: CTP_CLIENT_ID']);

    expect(() => {
      readConfiguration();
    }).toThrowError(CustomError);
  })

  it('should return the correct configuration when env variables are valid, not required vars should be empty', () => {
    process.env = mockEnv2
    const expectedConfig = {
      clientId: 'mockClientId',
      clientSecret: 'mockClientSecret',
      projectKey: 'mockProjectKey',
      scope: 'mockScope',
      region: 'mockRegion',
      languageCode: 'en-US',
      currencyCode: 'USD',
      countryCode: '',
      distributionChannelId: '',
      inventorySupplyChannelId: '',
      ordergrooveApiUrl: 'https://api',
      ordergrooveApiKey: 'mock-og-api-key'
    };

    // Mock the validation function to return an empty array (no errors)
    jest.spyOn(validatorHelper, 'getValidateMessages').mockReturnValue([]);

    const config = readConfiguration();
    expect(config).toEqual(expectedConfig);
  })
})
