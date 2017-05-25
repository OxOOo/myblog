
const app = require('./server');
const http = require('http');

http.createServer(app.callback()).listen(4000, '127.0.0.1');
console.log('listening on http://localhost:4000');
