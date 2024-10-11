class UpdateList {
    constructor(listRepository) {
        this.listRepository = listRepository;
    }

    async execute({ id, title, description }) {
        if (!id) {
            throw new Error('list id is required');
        }

        if (!title) {
            throw new Error('title is required');
        }

        description == undefined ? description = null : description;

        const list = await this.listRepository.update(id, title, description);
        return list;
    }
}

module.exports = UpdateList;