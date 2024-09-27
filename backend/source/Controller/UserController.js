class UserController {
    constructor(authenticateUser, registerUser) {
        this.authenticateUser = authenticateUser;
        this.registerUser = registerUser;
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await this.authenticateUser.execute({ username, password });
            res.json({ token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const token = await this.registerUser.execute({ username, email, password });
            res.json({ token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UserController;