class CardRepository {
    constructor(database) {
        this.pool = database.pool;  // Use the pool instead of a single connection
    }

    async create(title, listId) {
        const query = `INSERT INTO cards (title, lists_id) VALUES (?, ?)`;
        const [rows] = await this.pool.execute(query, [title, listId]);

        if (rows.affectedRows === 0) {
            throw new Error('Card not created');
        }

        return {
            id: rows.insertId,
            title,
            listId
        }
    }

    async update(id, title, description, listId) {
        const query = `call card_update(?, ?, ?, ?)`;
        const [rows] = await this.pool.execute(query, [id, title, description, listId]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = CardRepository;