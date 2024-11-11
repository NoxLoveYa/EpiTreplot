class CardRepository {
    constructor(database) {
        this.pool = database.pool;  // Use the pool instead of a single connection
    }

    async create(title, description, listId) {
        const query = `call card_insert(?, ?, ?)`;
        const [rows] = await this.pool.execute(query, [title, description, listId]);
        return rows.length ? rows[0] : null;
    }

    async update(id, title, description, listId) {
        const query = `call card_update(?, ?, ?, ?)`;
        const [rows] = await this.pool.execute(query, [id, title, description, listId]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = CardRepository;