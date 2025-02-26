class CardController {
    constructor(createCard, updateCard) {
        this.createCard = createCard;
        this.updateCard = updateCard;
    }

    async createEmptyCard(req, res) {
        try {
            const { title, listId } = req.body;
            const card = await this.createCard.execute({ title, listId });
            res.json({ card });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateCardById(req, res) {
        try {
            const { id, title } = req.body;
            const card = await this.updateCard.execute({ id, title });
            res.json({ card });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = CardController;