require('dotenv').config();
const express = require("express");
const app = express();
const DataBaseConnection = require("./Services/DatabaseService");

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const databaseConnection = new DataBaseConnection();
databaseConnection.connect();

const userRoutes = require('./Routes/UserRoutes')(databaseConnection);
app.use('/user', userRoutes);

const listRoutes = require('./Routes/ListRoutes')(databaseConnection);
app.use('/list', listRoutes);

try {
    app.listen(process.env.SERVER_PORT || 5000, () => {
        const port = process.env.SERVER_PORT || 5000;
        console.log(`Server running on port ${port}`);
    });
} catch (error) {
    console.error('Error while starting server: ', error);
}

module.exports = app;
