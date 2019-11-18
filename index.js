const http = require('http');
const app = require('./config/express')();
const httpServer = http.createServer(app);
require('dotenv').config()

const port = app.get('port');

httpServer.listen(port, () => console.log(`Listening on port ${port}`));