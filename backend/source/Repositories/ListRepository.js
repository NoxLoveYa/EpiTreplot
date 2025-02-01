class ListRepository {
    constructor(database) {
        this.pool = database.pool;  // Use the pool instead of a single connection
    }

    async findByWorkspace(id) {
        const query = `SELECT * FROM lists WHERE workspaces_id = ?`;
        const [rows] = await this.pool.execute(query, [id]);
        return rows.length ? rows : null;
    }

    async findById(id) {
        const query = `SELECT * FROM lists WHERE id = ?`;
        const [rows] = await this.pool.execute(query, [id]);
        return rows.length ? rows[0] : null;
    }

    async createList(title, workspaceId) {
        const query = `INSERT INTO lists (title, workspaces_id) VALUES (?, ?)`;
        const [rows] = await this.pool.execute(query, [title, workspaceId]);

        const selectQuery = `SELECT * FROM lists WHERE id = ?`;
        const [list] = await this.pool.execute(selectQuery, [rows.insertId]);
        console.log(list);
        return list.length ? list[0] : null;
    }

    async update(id, title) {
        const query = `UPDATE lists SET title = ? WHERE id = ?`;
        const [rows] = await this.pool.execute(query, [title, id]);
        return rows.length ? rows[0] : null;
    }

    async delete(id) {
        const query = `DELETE FROM lists WHERE id = ?`;
        const [rows] = await this.pool.execute(query, [id]);
        return rows.length ? rows[0] : null;
    }

    async duplicate(id) {
        const query = `INSERT INTO lists (title, workspaces_id) SELECT title, workspaces_id FROM lists WHERE id = ?`;
        const [rows] = await this.pool.execute(query, [id]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = ListRepository;