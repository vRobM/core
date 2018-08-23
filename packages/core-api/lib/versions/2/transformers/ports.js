'use strict'

/**
 * Turns a "config" object into readable object.
 * @param  {Object} model
 * @return {Object}
 */
module.exports = (config) => {
  let result = {}
  const keys = [
    '@phantomcore/core-p2p',
    '@phantomcore/core-api',
    '@phantomcore/core-graphql',
    '@phantomcore/core-json-rpc',
    '@phantomcore/core-webhooks'
  ]

  result[keys[0]] = config.plugins[keys[0]].port

  for (let [name, options] of Object.entries(config.plugins)) {
    if (keys.includes(name) && options.enabled) {
      if (options.server && options.server.enabled) {
        result[name] = options.server.port

        continue
      }

      result[name] = options.port
    }
  }

  return result
}
