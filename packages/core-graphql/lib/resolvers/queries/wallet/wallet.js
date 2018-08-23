'use strict';

const database = require('@phantomcore/core-container').resolvePlugin('database')

module.exports = (_, args) => {
  return database.wallets.findById(args)
}
