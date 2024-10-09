class CardController {
    constructor(createCard, updateCard) {
        this.createCard = createCard;
        this.updateCard = updateCard;
    }

    async createEmptyCard(req, res) {
        try {
            const { title, description, listId } = req.body;
            const card = await this.createCard.execute({ title, description, listId });
            res.json({ card });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateCardById(req, res) {
        try {
            const { id, title, description, listId } = req.body;
            const card = await this.updateCard.execute({ id, title, description, listId });
            res.json({ card });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = CardController;