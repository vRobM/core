'use strict';

const database = require('@phantomcore/core-container').resolvePlugin('database')
const { constants } = require('@phantomcore/crypto')
const { formatOrderBy, unserializeTransactions } = require('../../../helpers')

module.exports = async (root, args) => {
  const { orderBy, filter, ...params } = args

  const order = formatOrderBy(orderBy, 'timestamp:DESC')

  if (params.type) {
    params.type = constants.TRANSACTION_TYPES[params.type]
  }

  const transactions = await database.transactions.findAll({ ...filter, orderBy: order, ...params }, false)

  return unserializeTransactions(transactions)
}
