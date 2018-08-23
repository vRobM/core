'use strict'

const container = require('@phantomcore/core-container')

/**
 * Start a node.
 * @param  {Object} options
 * @return {void}
 */
module.exports = async (options) => {
  await container.setUp(options, {
    options: {
      '@phantomcore/core-p2p': {
        networkStart: options.networkStart
      },
      '@phantomcore/core-blockchain': {
        networkStart: options.networkStart
      },
      '@phantomcore/core-forger': {
        bip38: options.bip38,
        address: options.address,
        password: options.password
      }
    }
  })
}
