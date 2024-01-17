import { CustomObjectDraft, ClientResponse, CustomObject } from '@commercetools/platform-sdk';

import { createApiRoot } from '../../client/create.client';

export const createCustomObject = (customObjectDraft: CustomObjectDraft): Promise<ClientResponse<CustomObject>> =>
  createApiRoot()
    .customObjects()
    .post({ body: customObjectDraft })
    .execute()

export const getCustomObjectByContainerAndKey = (container: string, key: string): Promise<ClientResponse<CustomObject>> =>
  createApiRoot()
    .customObjects()
    .withContainerAndKey({
      container: container,
      key: key
    })
    .get()
    .execute()