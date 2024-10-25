const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    async verifyPassword(inputPassword, storedPassword) {
        return await bcrypt.compare(inputPassword, storedPassword);
    }

    generateToken(user) {
        const payload = { id: user.id, username: user.username };
        return jwt.sign(payload, 'secret_key', { expiresIn: '1h' });
    }

    validateToken(token) {
        try {
            return jwt.verify(token.token, 'secret_key');
        } catch (error) {
            console.error("Token validation error:", error.message);
            return null;
        }
    }
}

module.exports = AuthService;
