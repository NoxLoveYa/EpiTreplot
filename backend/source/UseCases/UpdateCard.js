class UpdateCard {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }

    async execute({ id, title, description, listId }) {
        if (!id) {
            throw new Error('card id is required');
        }

        if (!title || !listId) {
            throw new Error('title and listId are required');
        }

        description == undefined ? description = null : description;

        const list = await this.cardRepository.update(id, title, description, listId);
        return list;
    }
}

module.exports = UpdateCard;