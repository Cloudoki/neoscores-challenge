const config = require('config');
const bunyan = require('bunyan');

const bunyanConfig = config.logger;

exports = module.exports = bunyan.createLogger(bunyanConfig);