class CardController {
    constructor(createCard) {
        this.createCard = createCard;
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
}

module.exports = CardController;