'use strict'

const container = require('@phantomcore/core-container')

/**
 * Start a relay.
 * @param  {Object} options
 * @return {void}
 */
module.exports = async (options) => {
  await container.setUp(options, {
    exclude: ['@phantomcore/core-forger'],
    options: {
      '@phantomcore/core-blockchain': {
        networkStart: options.networkStart
      }
    }
  })
}
