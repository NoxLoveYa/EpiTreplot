class DeleteWorkspace {
    constructor(workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    async execute({ id }) {
        if (!id) {
            throw new Error('workspace id is required');
        }

        const data = await this.workspaceRepository.delete(id);
        return data;
    }
}

module.exports = DeleteWorkspace;