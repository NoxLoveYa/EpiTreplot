const User = require('../entities/User.js');

class AuthenticateUser {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    async execute({ userName, password }) {
        if (!userName || !password) {
            throw new Error('Username and password are required');
        }

        const userData = await this.userRepository.findByUsernameOrEmail(userName);
        if (!userData) {
            throw new Error('User does not exist');
        }
        const user = new User(userData.user);

        const isPasswordValid = await this.authService.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return this.authService.generateToken({ id: user.id, username: user.userName });
    }
}

module.exports = AuthenticateUser;
