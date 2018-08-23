'use strict'

module.exports = {
  enabled: process.env.PHANTOM_WEBHOOKS_ENABLED,
  database: {
    dialect: 'sqlite',
    storage: `${process.env.PHANTOM_PATH_DATA}/database/webhooks.sqlite`,
    logging: process.env.PHANTOM_DB_LOGGING
  },
  redis: {
    host: process.env.PHANTOM_REDIS_HOST || 'localhost',
    port: process.env.PHANTOM_REDIS_PORT || 6379
  },
  server: {
    enabled: process.env.PHANTOM_WEBHOOKS_API_ENABLED,
    host: process.env.PHANTOM_WEBHOOKS_HOST || '0.0.0.0',
    port: process.env.PHANTOM_WEBHOOKS_PORT || 4004,
    whitelist: ['127.0.0.1', '::ffff:127.0.0.1', '192.168.*'],
    pagination: {
      limit: 100,
      include: [
        '/api/webhooks'
      ]
    }
  }
}
