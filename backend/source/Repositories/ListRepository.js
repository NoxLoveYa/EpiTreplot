class ListRepository {
    constructor(database) {
        this.pool = database.pool;  // Use the pool instead of a single connection
    }

    async findByWorkspace(id) {
        const query = `
            SELECT lists.id, lists.title, lists.workspaces_id, 
                   cards.id AS card_id, cards.title AS card_title
            FROM lists 
            LEFT JOIN cards ON lists.id = cards.lists_id 
            WHERE lists.workspaces_id = ?;
        `;
        
        const [rows] = await this.pool.execute(query, [id]);
    
        if (!rows.length) return null;
    
        // Grouping lists and their corresponding cards
        const listsMap = new Map();
    
        rows.forEach(row => {
            if (!listsMap.has(row.id)) {
                listsMap.set(row.id, {
                    id: row.id,
                    title: row.title,
                    workspaces_id: row.workspaces_id,
                    cards: []
                });
            }
    
            if (row.card_id) { // Avoid pushing null card entries
                listsMap.get(row.id).cards.push({
                    id: row.card_id,
                    title: row.card_title
                });
            }
        });
    
        return Array.from(listsMap.values());
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
        
        const selectQuery = `SELECT * FROM lists WHERE id = ?`;
        const [list] = await this.pool.execute(selectQuery, [rows.insertId]);
        return list.length ? list[0] : null;
    }
}

module.exports = ListRepository;