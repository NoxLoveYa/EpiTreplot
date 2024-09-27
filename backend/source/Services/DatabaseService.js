require('dotenv').config();
const mysql = require('mysql2');

class DataBaseConnection {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.log('Error while connecting to database', err);
                return;
            }
            console.log('Connection established');
        });
    }

    close() {
        this.connection.end((err) => {
            if (err) {
                console.log('Error while closing connection', err);
                return;
            }
            console.log('Connection closed');
        });
    }
}

module.exports = DataBaseConnection;