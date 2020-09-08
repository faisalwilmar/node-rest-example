const redis = require("redis");
// https://www.npmjs.com/package/redis
// https://youtu.be/oaJq1mQ3dFI

const client = redis.createClient();
const logger = require('./logger');

client.on("error", function (error) {
    logger.error(error.message);
});

module.exports = client;