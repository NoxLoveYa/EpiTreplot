class DuplicateList {
    constructor(listRepository) {
        this.listRepository = listRepository;
    }

    async execute({ id }) {
        if (!id) {
            throw new Error('list id is required');
        }

        const list = await this.listRepository.duplicate(id);
        return list;
    }
}

module.exports = DuplicateList;