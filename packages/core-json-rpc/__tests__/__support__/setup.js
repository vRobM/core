'use strict'

const path = require('path')
const container = require('@phantomcore/core-container')

jest.setTimeout(60000)

beforeAll(async () => {
  await container.setUp({
    data: '~/.phantom',
    config: path.resolve(__dirname, '../../../core/lib/config/mainnet'),
    token: 'phantom',
    network: 'mainnet'
  }, {
    exclude: [
      '@phantomcore/core-api',
      '@phantomcore/core-webhooks',
      '@phantomcore/core-graphql',
      '@phantomcore/core-forger'
    ],
    options: {
      '@phantomcore/core-json-rpc': {
        enabled: true
      }
    }
  })
})

afterAll(async () => {
  await container.tearDown()
})
