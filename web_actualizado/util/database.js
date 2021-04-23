const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'proyecto_intento',
    password: ''
});

module.exports = pool.promise();