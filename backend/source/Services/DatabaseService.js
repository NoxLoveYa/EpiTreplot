require('dotenv').config();
const mysql = require('mysql2/promise');

class DataBaseConnection {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,  // Adjust based on your needs
            queueLimit: 0
        });
    }

    async connect() {
        try {
            // Test the connection
            await this.pool.getConnection();
            console.log('Connection to database established');
        } catch (err) {
            console.error('Error while connecting to database:', err);
        }
    }

    async close() {
        try {
            await this.pool.end();
            console.log('Connection pool closed');
        } catch (err) {
            console.error('Error while closing connection pool:', err);
        }
    }
}

module.exports = DataBaseConnection;
