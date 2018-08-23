'use strict'

const { VOTE } = require('@phantomcore/crypto').constants

module.exports = (received) => {
  return {
    message: () => 'Expected value to be a valid VOTE transaction.',
    pass: received.type === VOTE
  }
}
