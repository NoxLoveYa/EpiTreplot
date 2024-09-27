const express = require('express');

const UserRepository = require('../Repositories/UserRepository');
const AuthService = require('../Services/AuthService');
const AuthenticateUser = require('../UseCases/AuthenticateUser');
const RegisterUser = require('../UseCases/RegisterUser');
const UserController = require('../Controller/UserController');

module.exports = (dbConnection) => {
    const router = express.Router();

    const userRepository = new UserRepository(dbConnection);
    const authService = new AuthService();
    const authenticateUser = new AuthenticateUser(userRepository, authService);
    const registerUser = new RegisterUser(userRepository, authService);
    const userController = new UserController(authenticateUser, registerUser);

    router.post('/login', (req, res) => userController.login(req, res));
    router.post('/register', (req, res) => userController.register(req, res));

    return router;
};