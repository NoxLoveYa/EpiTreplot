class UserRepository {
    constructor(database) {
        this.database = database;
    }

    async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await this.database.execute(query, [username]);
        return rows.length ? rows[0] : null;
    }

    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await this.database.execute(query, [email]);
        return rows.length ? rows[0] : null;
    }

    async create(user) {
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const values = [user.username, user.email, user.password];
        return await this.database.execute(sql, values);
    }
}

module.exports = UserRepository;
