'use strict'

module.exports = {
  transports: {
    console: {
      constructor: 'Console',
      options: {
        colorize: true,
        level: process.env.PHANTOM_LOG_LEVEL || 'debug',
        timestamp: () => Date.now(),
        formatter: (info) => require('./formatter')(info)
      }
    },
    dailyRotate: {
      package: 'winston-daily-rotate-file',
      constructor: 'DailyRotateFile',
      options: {
        filename: process.env.PHANTOM_LOG_FILE || `${process.env.PHANTOM_PATH_DATA}/logs/core/${process.env.PHANTOM_NETWORK_NAME}/%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        level: process.env.PHANTOM_LOG_LEVEL || 'debug',
        zippedArchive: true
      }
    }
  }
}
