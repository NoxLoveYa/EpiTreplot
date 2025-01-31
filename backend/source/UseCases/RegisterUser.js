const User = require('../entities/User');

class RegisterUser {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    async execute({ userName, displayName, email, password }) {
        if (!userName || !email || !password) {
            throw new Error('username, email, and password are required');
        }

        if (displayName == undefined)
            displayName = null;

        console.log('Registering user:', userName, displayName, email, password);

        const usernameExist = await this.userRepository.findByUsername(userName);
        if (usernameExist) {
            throw new Error('Username already exists');
        }

        const emailExists = await this.userRepository.findByEmail(email);
        if (emailExists) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await this.authService.hashPassword(password);
        const user = new User({ userName, displayName, email, password: hashedPassword });
        const response = await this.userRepository.create(user);
        user.id = response.id;
        return this.authService.generateToken({ id: user.id, username: user.userName });
    }
}

module.exports = RegisterUser;
