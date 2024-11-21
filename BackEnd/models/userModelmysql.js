const mysql = require('mysql2');
const db = require('../database/mysql'); // You'll need to move your DB connection to a separate file

class User {
    static async findByEmail(email) {
        try {
            const [results] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
            return results[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(userData) {
        try {
            const [results] = await db.promise().query('INSERT INTO users SET ?', userData);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [results] = await db.promise().query('SELECT id, name, email FROM users WHERE id = ?', [id]);
            return results[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;