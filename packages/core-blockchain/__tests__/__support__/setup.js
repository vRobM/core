'use strict'

const path = require('path')
const container = require('@phantomcore/core-container')

exports.setUp = async () => {
  await container.setUp({
    data: '~/.phantom',
    config: path.resolve(__dirname, '../../../core/lib/config/testnet'),
    token: 'phantom',
    network: 'testnet'
  }, {
    exit: '@phantomcore/core-p2p',
    exclude: ['@phantomcore/core-blockchain']
  })

  return container
}

exports.tearDown = async () => container.tearDown()
