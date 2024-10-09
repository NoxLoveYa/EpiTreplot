class CardRepository {
    constructor(database) {
        this.pool = database.pool;  // Use the pool instead of a single connection
    }

    async create(title, description, listId) {
        const query = 'call epitreplot.card_insert(?, ?, ?)';
        const [rows] = await this.pool.execute(query, [title, description, listId]);
        return rows.length ? rows[0] : null;
    }
}

module.exports = CardRepository;