![PHANTOM Core](https://i.imgur.com/dPHOKrL.jpg))

# PHANTOM Core - JSON-RPC Server

## Installation

```bash
yarn add @phantomcore/core-json-rpc
```

## Configuration

### Defaults

```js
'use strict'

module.exports = {
  port: 8080,
  allowRemote: true,
  whitelist: ['127.0.0.1', '::ffff:127.0.0.1', '192.168.*']
}
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@phantom.org. All security vulnerabilities will be promptly addressed.

## Credits

- [François-Xavier Thoorens](https://github.com/fix)
- [Brian Faust](https://github.com/faustbrian)
- [All Contributors](../../../../contributors)

## License

[MIT](LICENSE) © [ArkEcosystem](https://ark.io)
