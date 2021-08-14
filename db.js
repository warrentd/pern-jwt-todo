const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: 'PhoenixComp96734',
    host: 'localhost',
    port: 5432,
    database: 'pernjwttodo'
});

module.exports = pool;