const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'bd-natgas.mysql.database.azure.com',
    user: 'natgasAdmin@bd-natgas',
    database: 'natgas_memeh',
    password: 'n4tgasPassword'
});

module.exports = pool.promise();