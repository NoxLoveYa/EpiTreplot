const User = require('../entities/User');

class RegisterUser {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    async execute({ username, surname, displayName, avatar, email, password }) {
        if (!username || !surname || !displayName || !email || !password) {
            throw new Error('Username, Surname, DisplayName, email, and password are required');
        }
        const usernameExist = await this.userRepository.findByUsername(username);
        if (usernameExist) {
            throw new Error('Username already exists');
        }

        const emailExists = await this.userRepository.findByEmail(email);
        if (emailExists) {
            throw new Error('Email already exists');
        }
        const hashedPassword = await this.authService.hashPassword(password);
        const user = new User({ username, surname, displayName, avatar, email, password: hashedPassword });
        const response = await this.userRepository.create(user);
        user.id = response[0].insertId;
        return this.authService.generateToken({ id: user.id, username: user.username });
    }
}

module.exports = RegisterUser;
