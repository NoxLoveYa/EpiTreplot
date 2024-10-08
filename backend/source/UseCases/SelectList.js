class SelectList {
    constructor(listRepository) {
        this.listRepository = listRepository;
    }

    async execute({ workspaceId }) {
        if (!workspaceId) {
            throw new Error('workspaceId is required');
        }

        const lists = await this.listRepository.findByWorkspace(workspaceId);
        return lists;
    }
}

module.exports = SelectList;