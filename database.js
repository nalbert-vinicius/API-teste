const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URI
});

pool.on('connect', () =>{
    console.log("Successful connecting to database")
})

module.exports = {
    query: (text, params) => pool.query(text, params)
};

