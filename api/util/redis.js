const redis = require("redis");
// https://www.npmjs.com/package/redis
// https://dzone.com/articles/a-brief-introduction-to-caching-with-nodejs-and-re
const client = redis.createClient();
const logger = require('../util/logger');

client.on("error", function (error) {
    logger.error(error.message);
});

module.exports = client;