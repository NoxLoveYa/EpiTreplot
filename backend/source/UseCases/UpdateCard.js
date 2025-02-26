class UpdateCard {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }

    async execute({ id, title }) {
        if (!id) {
            throw new Error('card id is required');
        }

        if (!title) {
            throw new Error('title is required');
        }

        const list = await this.cardRepository.update(id, title);
        return list;
    }
}

module.exports = UpdateCard;