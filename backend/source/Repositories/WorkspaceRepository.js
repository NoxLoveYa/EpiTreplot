class WorkspaceRepository {
    constructor(database) {
        this.pool = database.pool;  // Use the pool instead of a single connection
    }

    async findByUserId(id) {
        const query = 'SELECT * FROM workspaces WHERE users_id = ?';
        const [rows] = await this.pool.execute(query, [id]);
        return rows.length ? rows : null;
    }

    async create(title, userId) {
        const query = 'INSERT INTO workspaces (name, users_id) VALUES (?, ?)';
        const [rows] = await this.pool.execute(query, [title, userId]);
        return rows.length ? rows[0] : null;
    }

    async delete(id) {
        const query = 'DELETE FROM workspaces WHERE id = ?';
        const [rows] = await this.pool.execute(query, [id]);
        return rows.length ? rows[0] : null;
    }

    async update(id, title) {
        const query = 'UPDATE workspaces SET name = ? WHERE id = ?';
        const [rows] = await this.pool.execute(query, [title, id]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = WorkspaceRepository;