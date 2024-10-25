class ValidateUser {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    async execute({ token }) {
        if (!token) {
            throw new Error('Token is required');
        }

        return this.authService.validateToken({ token: token });
    }
}

module.exports = ValidateUser;
