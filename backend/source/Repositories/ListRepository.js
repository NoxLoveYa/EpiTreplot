class ListRepository {
    constructor(database) {
        this.pool = database.pool;  // Use the pool instead of a single connection
    }

    async findByWorkspace(id) {
        const query = 'call epitreplot.list_select(?)';
        const [rows] = await this.pool.execute(query, [id]);
        return rows.length ? rows[0] : null;
    }

    async createList(title, description, workspaceId) {
        const query = 'call epitreplot.list_insert(?, ?, ?)';
        const [rows] = await this.pool.execute(query, [title, description, workspaceId]);
        return rows.length ? rows[0] : null;
    }

    async update(id, title, description) {
        const query = 'call epitreplot.list_update(?, ?, ?)';
        const [rows] = await this.pool.execute(query, [id, title, description]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = ListRepository;