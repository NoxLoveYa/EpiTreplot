class UserRepository {
    constructor(database) {
        this.pool = database.pool;  // Use the pool instead of a single connection
    }

    async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE name = ?';
        const [rows] = await this.pool.execute(query, [username]);
        return rows.length ? rows[0] : null;
    }

    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await this.pool.execute(query, [email]);
        return rows.length ? rows[0] : null;
    }
    
    async findByUsernameOrEmail(username) {
        const query = 'SELECT * FROM users WHERE userName = ? OR email = ?';
        const [rows] = await this.pool.execute(query, [username, username]);
        
        if (rows.length) {
            if (rows[0].name === username) {
                return { found: 'username', user: rows[0] };
            } else if (rows[0].email === username) {
                return { found: 'email', user: rows[0] };
            }
        }
        return null;
    }

    async create(user) {
        const sql = 'call users_insert(?, ?, ?, ?)';
        const values = [user.username, user.displayName, user.email, user.password];
        const [rows] = await this.pool.execute(sql, values);
        return rows.length ? rows[0] : null;
    }
}

module.exports = UserRepository;