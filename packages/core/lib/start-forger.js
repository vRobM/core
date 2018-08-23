'use strict'

const container = require('@phantomcore/core-container')

/**
 * Start a forger.
 * @param  {Object} options
 * @return {void}
 */
module.exports = async (options) => {
  await container.setUp(options, {
    include: [
      '@phantomcore/core-event-emitter',
      '@phantomcore/core-config',
      '@phantomcore/core-logger',
      '@phantomcore/core-logger-winston',
      '@phantomcore/core-forger'
    ],
    options: {
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
