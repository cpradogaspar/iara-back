const mysql2 = require('mysql2')

function createTempConn() {
    let conn = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'iara_db',
    })

    return conn
}

module.exports = createTempConn