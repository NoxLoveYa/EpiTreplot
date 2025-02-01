class CreateCard {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }

    async execute({ title, listId }) {
        if (!listId || !title) {
            throw new Error('listId and title are required');
        }

        const card = await this.cardRepository.create(title, listId);
        return card;
    }
}

module.exports = CreateCard;