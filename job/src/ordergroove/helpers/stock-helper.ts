import { ProductVariantAvailability, ProductVariantChannelAvailabilityMap } from '@commercetools/platform-sdk';
import { readConfiguration } from '../../utils/config.utils';

export const isProductOnStock = (productAvailability?: ProductVariantAvailability): boolean => {
  if (productAvailability === undefined) {
    return true;
  } else {
    return searchStockInChannels(productAvailability);
  }
}

function searchStockInChannels(productAvailability: ProductVariantAvailability): boolean {
  const channels = productAvailability.channels;

  if (channels === undefined) {
    return productAvailability.isOnStock ?? true;
  } else {
    if (readConfiguration().inventorySupplyChannelId !== '' && channels[readConfiguration().inventorySupplyChannelId] !== undefined) {
      return channels[readConfiguration().inventorySupplyChannelId].isOnStock as boolean ?? true;
    }

    const atLeastOneChannelHasStock = isOnStockAtLeastInOneChannel(channels);
    const isOnStockForAnyChannel = productAvailability.isOnStock ?? false;

    return isOnStockForAnyChannel || atLeastOneChannelHasStock;
  }
}

function isOnStockAtLeastInOneChannel(channels: ProductVariantChannelAvailabilityMap): boolean {
  let result = false;

  const valuesArray = Object.values(channels);
  valuesArray.forEach(value => {
    if (value.isOnStock === true) {
      result = true;
    }
  });

  return result;
}