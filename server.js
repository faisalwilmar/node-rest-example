const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000; //if set, use defined port, else, use 3000

//process.env is environment variable, saved in nodemon.json

const server = http.createServer(app); //app is an event listener or first request handler

server.listen(port);

module.exports = server; //exported for testing