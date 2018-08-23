'use strict';

const database = require('@phantomcore/core-container').resolvePlugin('database')

module.exports = (_, { id }) => database.blocks.findById(id)
