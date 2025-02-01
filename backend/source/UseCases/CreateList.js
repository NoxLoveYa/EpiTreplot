class CreateList {
    constructor(listRepository) {
        this.listRepository = listRepository;
    }

    async execute({ title, workspaceId }) {
        if (!workspaceId || !title) {
            throw new Error('workspaceId and title are required');
        }

        const list = await this.listRepository.createList(title, workspaceId);
        return list;
    }
}

module.exports = CreateList;