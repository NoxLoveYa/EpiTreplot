class UserController {
    constructor(authenticateUser, registerUser, validateUser) {
        this.authenticateUser = authenticateUser;
        this.registerUser = registerUser;
        this.validateUser = validateUser;
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
            const { username, displayName, avatar, email, password } = req.body;
            const token = await this.registerUser.execute({ username, displayName, avatar, email, password });
            res.json({ token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async validate(req, res) {
        try {
            const { token } = req.body;
            const data = await this.validateUser.execute({ token });
            res.json({ data });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UserController;