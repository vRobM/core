'use strict'

const app = require('./__support__/setup')
const generateRound = require('./__support__/utils/generate-round')
const createConnection = require('./__support__/utils/create-connection')
const activeDelegates = require('./__fixtures__/delegates.json')
const genesisBlock = require('./__fixtures__/genesisBlock')

let connection

beforeAll(async () => {
  await app.setUp()
})

afterAll(async () => {
  await app.tearDown()
})

beforeEach(async () => {
  connection = await createConnection()
})

afterEach(async () => {
  connection.disconnect()
})

describe('Sequelize Connection', () => {
  it('should be an object', () => {
    expect(connection).toBeObject()
  })

  describe('make', () => {
    it('should be a function', () => {
      expect(connection.make).toBeFunction()
    })

    it('should instantiate sequelize', async () => {
      const connection = new (require('../lib/connection'))({
        dialect: 'sqlite',
        storage: ':memory:'
      })

      await connection.make()

      expect(connection.connection).toBeInstanceOf(require('sequelize'))
    })
  })

  describe('getActiveDelegates', () => {
    it('should be a function', () => {
      expect(connection.getActiveDelegates).toBeFunction()
    })

    it('should return active delegates', async () => {
      await connection.saveRound(generateRound(activeDelegates, 1))

      const delegates = await connection.getActiveDelegates(1)

      expect(delegates).toBeArray()
      expect(delegates).toHaveLength(51)
      expect(delegates[0]).toBeObject()
      expect(delegates[0]).toHaveProperty('id')
      expect(delegates[0]).toHaveProperty('round')
      expect(delegates[0]).toHaveProperty('publicKey')
      expect(delegates[0]).toHaveProperty('balance')
    })
  })

  describe('saveRound', () => {
    it('should be a function', () => {
      expect(connection.saveRound).toBeFunction()
    })

    it('should save round to the database', async () => {
      const round = await connection.saveRound(generateRound(activeDelegates, 1))
      expect(round).toBeArray()
      expect(round[0]).toBeObject()
      expect(round[0].publicKey).toBe(activeDelegates[0])
    })
  })

  describe('deleteRound', () => {
    it('should be a function', () => {
      expect(connection.deleteRound).toBeFunction()
    })

    it('should remove round from the database', async () => {
      const round = await connection.saveRound(generateRound(activeDelegates, 1))
      expect(round).toBeArray()

      const before = await connection.models.round.findAndCountAll()
      expect(before.count).toBe(51)

      await connection.deleteRound(1)

      const after = await connection.models.round.findAndCountAll()
      expect(after.count).toBe(0)
    })
  })

  describe('buildDelegates', () => {
    it('should be a function', () => {
      expect(connection.buildDelegates).toBeFunction()
    })

    it('should return a list of delegates', async () => {
      await connection.saveBlock(genesisBlock)

      await connection.buildWallets(1)
      await connection.saveWallets(true)

      const delegates = await connection.buildDelegates(51, 1)

      expect(delegates).toHaveLength(51)
    })
  })

  describe('buildWallets', () => {
    it('should be a function', () => {
      expect(connection.buildWallets).toBeFunction()
    })

    it('should return a list of wallets', async () => {
      await connection.saveBlock(genesisBlock)

      const wallets = await connection.buildWallets(1)

      expect(Object.keys(wallets)).toHaveLength(53)
    })
  })

  describe('updateDelegateStats', () => {
    it('should be a function', () => {
      expect(connection.updateDelegateStats).toBeFunction()
    })

    it('should update the delegate', async () => {
      await connection.saveBlock(genesisBlock)

      await connection.buildWallets(1)
      await connection.saveWallets(true)

      const delegates = await connection.buildDelegates(51, 1)

      const wallet = connection.walletManager.getWalletByPublicKey('03e59140fde881ac437ec3dc3e372bf25f7c19f0b471a5b35cc30f783e8a7b811b')
      expect(wallet.missedBlocks).toBe(0)

      await connection.updateDelegateStats(genesisBlock, delegates)

      expect(wallet.missedBlocks).toBe(1)
    })
  })

  describe('saveWallets', () => {
    it('should be a function', () => {
      expect(connection.saveWallets).toBeFunction()
    })

    it('should save the wallets', async () => {
      await connection.saveBlock(genesisBlock)

      await connection.buildWallets(1)
      await connection.saveWallets(true)

      const walletCount = await connection.models.wallet.count()
      expect(walletCount).toBe(53)
    })
  })

  describe('saveBlock', () => {
    it('should be a function', () => {
      expect(connection.saveBlock).toBeFunction()
    })

    it('should save the block and transactions', async () => {
      await connection.saveBlock(genesisBlock)

      const blockCount = await connection.models.block.count()
      expect(blockCount).toBe(1)

      const transactionCount = await connection.models.transaction.count()
      expect(transactionCount).toBe(153)
    })
  })

  describe('saveBlockAsync', () => {
    it('should be a function', () => {
      expect(connection.saveBlockAsync).toBeFunction()
    })

    it('should save the block and transactions', async () => {
      await connection.saveBlockAsync(genesisBlock)

      const blockCount = await connection.models.block.count()
      expect(blockCount).toBe(1)

      const transactionCount = await connection.models.transaction.count()
      expect(transactionCount).toBe(153)
    })
  })

  describe('saveBlockCommit', () => {
    it('should be a function', () => {
      expect(connection.saveBlockCommit).toBeFunction()
    })

    it('should save the block and transactions', async () => {
      await connection.saveBlockAsync(genesisBlock)
      await connection.saveBlockCommit()

      const blockCount = await connection.models.block.count()
      expect(blockCount).toBe(1)

      const transactionCount = await connection.models.transaction.count()
      expect(transactionCount).toBe(153)
    })
  })

  describe('deleteBlock', () => {
    it('should be a function', () => {
      expect(connection.deleteBlock).toBeFunction()
    })

    it('should remove the block and transactions', async () => {
      await connection.saveBlock(genesisBlock)

      let blockCount = await connection.models.block.count()
      expect(blockCount).toBe(1)

      let transactionCount = await connection.models.transaction.count()
      expect(transactionCount).toBe(153)

      await connection.deleteBlock(genesisBlock)

      blockCount = await connection.models.block.count()
      expect(blockCount).toBe(0)

      transactionCount = await connection.models.transaction.count()
      expect(transactionCount).toBe(0)
    })
  })

  describe('getBlock', () => {
    it('should be a function', () => {
      expect(connection.getBlock).toBeFunction()
    })

    it('should get the block and transactions', async () => {
      await connection.saveBlock(genesisBlock)

      const block = await connection.getBlock(genesisBlock.data.id)
      expect(block).toBeObject()
      expect(block.data.id).toBe(genesisBlock.data.id)
    })
  })

  describe('getTransaction', () => {
    it('should be a function', () => {
      expect(connection.getTransaction).toBeFunction()
    })

    it('should get the transaction', async () => {
      const genesisTransaction = genesisBlock.transactions[0].id

      await connection.saveBlock(genesisBlock)

      const transaction = await connection.getTransaction(genesisTransaction)
      expect(transaction).toBeObject()
      expect(transaction.id).toBe(genesisTransaction)
    })
  })

  describe('getCommonBlock', () => {
    it('should be a function', () => {
      expect(connection.getCommonBlock).toBeFunction()
    })

    it('should get the common block', async () => {
      await connection.saveBlock(genesisBlock)

      const blocks = await connection.getCommonBlock([genesisBlock.data.id])

      expect(blocks).toBeObject()
      expect(blocks[0].id).toBe(genesisBlock.data.id)
    })
  })

  describe('getTransactionsFromIds', () => {
    it('should be a function', () => {
      expect(connection.getTransactionsFromIds).toBeFunction()
    })

    it('should get the transactions', async () => {
      await connection.saveBlock(genesisBlock)

      const transactions = await connection.getTransactionsFromIds([
        'db1aa687737858cc9199bfa336f9b1c035915c30aaee60b1e0f8afadfdb946bd',
        '0762007f825f02979a883396839d6f7425d5ab18f4b8c266bebe60212c793c6d',
        '3c39aca95ad807ce19c0325e3059d7b1cf967751c6929035214a4ef320fb8154'
      ])

      expect(transactions).toBeObject()
      expect(transactions[0].id).toBe('db1aa687737858cc9199bfa336f9b1c035915c30aaee60b1e0f8afadfdb946bd')
      expect(transactions[1].id).toBe('0762007f825f02979a883396839d6f7425d5ab18f4b8c266bebe60212c793c6d')
      expect(transactions[2].id).toBe('3c39aca95ad807ce19c0325e3059d7b1cf967751c6929035214a4ef320fb8154')
    })
  })

  describe('getForgedTransactionsIds', () => {
    it('should be a function', () => {
      expect(connection.getForgedTransactionsIds).toBeFunction()
    })

    it('should get the transactions', async () => {
      await connection.saveBlock(genesisBlock)

      const transactions = await connection.getForgedTransactionsIds([
        'db1aa687737858cc9199bfa336f9b1c035915c30aaee60b1e0f8afadfdb946bd',
        '0762007f825f02979a883396839d6f7425d5ab18f4b8c266bebe60212c793c6d',
        '3c39aca95ad807ce19c0325e3059d7b1cf967751c6929035214a4ef320fb8154'
      ])

      expect(transactions).toBeObject()
      expect(transactions[0]).toBe('0762007f825f02979a883396839d6f7425d5ab18f4b8c266bebe60212c793c6d')
      expect(transactions[1]).toBe('3c39aca95ad807ce19c0325e3059d7b1cf967751c6929035214a4ef320fb8154')
      expect(transactions[2]).toBe('db1aa687737858cc9199bfa336f9b1c035915c30aaee60b1e0f8afadfdb946bd')
    })
  })

  describe('getLastBlock', () => {
    it('should be a function', () => {
      expect(connection.getLastBlock).toBeFunction()
    })

    it('should get the last block', async () => {
      await connection.saveBlock(genesisBlock)

      const block = await connection.getLastBlock()

      expect(block).toBeObject()
      expect(block.data.id).toBe(genesisBlock.data.id)
    })
  })

  describe('getBlocks', () => {
    it('should be a function', () => {
      expect(connection.getBlocks).toBeFunction()
    })

    it('should get the blocks', async () => {
      await connection.saveBlock(genesisBlock)

      const blocks = await connection.getBlocks(0, 1)

      expect(blocks).toBeObject()
      expect(blocks[0].id).toBe(genesisBlock.data.id)
    })
  })

  describe('getBlockHeaders', () => {
    it('should be a function', () => {
      expect(connection.getBlockHeaders).toBeFunction()
    })

    it('should get the block headers', async () => {
      await connection.saveBlock(genesisBlock)

      const blocks = await connection.getBlockHeaders(0, 1)

      expect(blocks).toBeObject()
      expect(blocks[0]).toBeInstanceOf(Buffer)
    })
  })
})
