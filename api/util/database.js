const mysql = require('mysql2');

const pool = mysql.createPool({ //pool open connection to the database and not closed after the query ended, so it can be used again by another query
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
});

module.exports = pool.promise();