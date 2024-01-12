import CustomError from '../errors/custom.error';
import envValidators from '../validators/env.validators';
import { getValidateMessages } from '../validators/helpers.validators';

/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */
export const readConfiguration = () => {
  const envVars = {
    clientId: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
    projectKey: process.env.CTP_PROJECT_KEY as string,
    scope: process.env.CTP_SCOPE,
    region: process.env.CTP_REGION as string,
    languageCode: process.env.CTP_LANGUAGE_CODE as string,
    currencyCode: process.env.CTP_CURRENCY_CODE as string,
    countryCode: process.env.CTP_COUNTRY_CODE as string ?? '',
    distributionChannelId: process.env.CTP_DISTRIBUTION_CHANNEL_ID as string ?? '',
    inventorySupplyChannelId: process.env.CTP_INVENTORY_SUPPLY_CHANNEL_ID as string ?? '',
    ordergrooveApiUrl: process.env.OG_API_URL as string,
    ordergrooveApiKey: process.env.OG_API_KEY as string,
    productStoreUrl: process.env.PRODUCT_STORE_URL as string ?? '',
  };

  const validationErrors = getValidateMessages(envValidators, envVars);

  if (validationErrors.length) {
    throw new CustomError(
      'InvalidEnvironmentVariablesError',
      'Invalid Environment Variables please check your .env file',
      validationErrors
    );
  }

  return envVars;
};
