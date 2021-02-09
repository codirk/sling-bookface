'use strict'

const http = require('http-server');

console.log('starting server ...');

const server = http.createServer({
    cache: -1,
//    headers: {"Cache-Control": "no-cache"}
});

const PORT = 3000
server.listen(PORT, error => {
    if (error) {
        return console.error(error)
    }

    console.log(`Server listening on port ${PORT}`)
})