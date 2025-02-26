class DeleteCard {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }

    async execute({ id }) {
        if (!id) {
            throw new Error('card id is required');
        }

        const data = await this.cardRepository.delete(id);
        return data;
    }
}

module.exports = DeleteCard;