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

    async update(id, title) {
        const query = `UPDATE cards set title = ? WHERE id = ?`;
        const [rows] = await this.pool.execute(query, [title, id]);
        onst [result] = await this.pool.execute(updateQuery, [name, description, id]);

        // If no rows were affected, return null (card not found)
        if (result.affectedRows === 0) return null;

        // Fetch and return the updated card
        const selectQuery = `SELECT * FROM cards WHERE id = ?;`;
        const [updatedRows] = await this.pool.execute(selectQuery, [id]);

        return updatedRows.length ? updatedRows[0] : null;
    }
}

module.exports = CardRepository;