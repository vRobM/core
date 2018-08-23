'use strict'

const { crypto } = require('@phantomcore/crypto')

module.exports = (received) => {
  return {
    message: () => 'Expected value to be a valid public key',
    pass: crypto.validatePublicKey(received)
  }
}
