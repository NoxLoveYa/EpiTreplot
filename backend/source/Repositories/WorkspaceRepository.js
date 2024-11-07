class WorkspaceRepository {
    constructor(database) {
        this.pool = database.pool;  // Use the pool instead of a single connection
    }

    async findByUserId(id) {
        const query = 'CALL epitreplot.workspace_select(?)';
        const [rows] = await this.pool.execute(query, [id]);
        return rows.length ? rows[0] : null;
    }

    async create(title, description, image, userId) {
        const query = 'CALL epitreplot.workspace_insert(?, ?, ?, ?)';
        const [rows] = await this.pool.execute(query, [title, description, image, userId]);
        return rows.length ? rows[0] : null;
    }

    async delete(id) {
        const query = 'CALL epitreplot.workspace_delete(?)';
        const [rows] = await this.pool.execute(query, [id]);
        return rows.length ? rows[0] : null;
    }

    async update(id, title, description) {
        const query = 'CALL epitreplot.workspace_update(?, ?)';
        const [rows] = await this.pool.execute(query, [id, title]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = WorkspaceRepository;