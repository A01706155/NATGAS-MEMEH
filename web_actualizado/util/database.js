const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'natgas_memeh_experimental',
    password: ''
});

module.exports = pool.promise();