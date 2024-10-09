class CreateCard {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }

    async execute({ title, description, listId }) {
        if (!listId || !title) {
            throw new Error('listId and title are required');
        }

        description == undefined ? description = null : description;

        const list = await this.cardRepository.create(title, description, listId);
        return list;
    }
}

module.exports = CreateCard;