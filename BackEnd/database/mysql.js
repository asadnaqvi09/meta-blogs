const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    try {
        if (err) {
            throw err;
        }
        console.log('MySQL Database Connected Successfully');
    } catch (error) {
        console.error('Error connecting to MySQL database:', error.message);
        process.exit(1);
    }
});

module.exports = db;