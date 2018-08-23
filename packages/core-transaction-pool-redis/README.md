![PHANTOM Core](https://i.imgur.com/dPHOKrL.jpg))

# PHANTOM Core - Transaction Pool Redis

## Installation

```bash
yarn add @phantomcore/core-transaction-pool-redis
```

## Configuration

### Defaults

```js
module.exports = {
  enabled: true,
  key: 'ark',
  maxTransactionsPerSender: 100,
  allowedSenders: [],
  redis: {
    host: process.env.ARK_REDIS_HOST || 'localhost',
    port: process.env.ARK_REDIS_PORT || 6379
  }
}
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@phantom.org. All security vulnerabilities will be promptly addressed.

## Credits

- [Kristjan Košič](https://github.com/kristjank)
- [Brian Faust](https://github.com/faustbrian)
- [Alex Barnsley](https://github.com/alexbarnsley)
- [All Contributors](../../../../contributors)

## License

[MIT](LICENSE) © [ArkEcosystem](https://ark.io)
