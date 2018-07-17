const start = require('./start');
const lms = require('./lms-integration');
const webhook = require('./webhook-integration');

module.exports = {
    lms,
    start,
    webhook
};