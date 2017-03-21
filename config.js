exports = module.exports = {
  port: process.env.RC_PORT || 3000,
  logger: {
    name: process.env.RC_LOGGER_NAME || 'RC',
    level: process.env.RC_LOGGER_LEVEL || 'debug',
  },
};