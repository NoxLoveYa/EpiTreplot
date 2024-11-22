class RoomRepository {
    constructor(database) {
        this.pool = database.pool;  // Use the pool instead of a single connection
    }

    async create(user_id, workspace_id) {
        const query = 'CALL room_insert(?, ?)';
        const [rows] = await this.pool.execute(query, [user_id, workspace_id]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = RoomRepository;