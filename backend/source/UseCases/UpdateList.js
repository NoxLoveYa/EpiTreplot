class UpdateList {
    constructor(listRepository) {
        this.listRepository = listRepository;
    }

    async execute({ id, title }) {
        if (!id) {
            throw new Error('list id is required');
        }

        if (!title) {
            throw new Error('title is required');
        }

        const list = await this.listRepository.update(id, title);
        return list;
    }
}

module.exports = UpdateList;