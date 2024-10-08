class ListRepository {
    constructor(database) {
        this.pool = database.pool;  // Use the pool instead of a single connection
    }

    async findByWorkspace(id) {
        const query = 'call epitreplot.list_select(?)';
        const [rows] = await this.pool.execute(query, [id]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = ListRepository;