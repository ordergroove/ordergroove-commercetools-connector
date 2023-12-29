import { createHttpMiddlewareOptions } from './http.middleware'

describe('createHttpMiddlewareOptions configuration', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should generate httpMiddlewareOptions with the correct host', () => {
    const expectedHttpMiddlewareOptions = {
      host: `https://api.test-region.commercetools.com`,
    }

    const result = createHttpMiddlewareOptions('test-region')

    expect(result).toEqual(expectedHttpMiddlewareOptions)
  })
})
