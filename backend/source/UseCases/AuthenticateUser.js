const User = require('../entities/User.js');

class AuthenticateUser {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    async execute({ username, password }) {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        const userData = await this.userRepository.findByUsername(username);
        if (!userData) {
            throw new Error('User not found');
        }
        const user = new User(userData);

        const isPasswordValid = await this.authService.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return this.authService.generateToken({ id: user.id, username: user.username });
    }
}

module.exports = AuthenticateUser;
