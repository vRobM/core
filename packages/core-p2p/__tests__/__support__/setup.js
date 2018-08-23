'use strict'

const path = require('path')
const container = require('@phantomcore/core-container')

jest.setTimeout(60000)

exports.setUp = async () => {
  await container.setUp({
    data: '~/.phantom',
    config: path.resolve(__dirname, './config')
  }, {
    exit: '@phantomcore/core-blockchain'
  })
}

exports.tearDown = async () => {
  await container.tearDown()
}
