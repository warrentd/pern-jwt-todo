const Pool = require('pg').Pool;
require('dotenv').config()

//Method 1
//const devConfig = {
//     user: process.env.PG_USER,
//     password: process.env.PG_PASS,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DATABASE
// }

// const proConfig = {
//     connectionString: process.env.DATABASE_URL //heroku addons
// }
// const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);

//Method 2
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString :  process.env.NODE_ENV === 'production' ? proConfig : devConfig
});

module.exports = pool;