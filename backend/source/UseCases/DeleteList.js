class DeleteList {
    constructor(listRepository) {
        this.listRepository = listRepository;
    }

    async execute({ id }) {
        if (!id) {
            throw new Error('list id is required');
        }

        const data = await this.listRepository.delete(id);
        return data;
    }
}

module.exports = DeleteList;