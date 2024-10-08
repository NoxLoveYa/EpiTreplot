class CreateList {
    constructor(listRepository) {
        this.listRepository = listRepository;
    }

    async execute({ title, description, workspaceId }) {
        if (!workspaceId || !title) {
            throw new Error('workspaceId and title are required');
        }

        description == undefined ? description = null : description;

        const list = await this.listRepository.createList(title, description, workspaceId);
        return list;
    }
}

module.exports = CreateList;