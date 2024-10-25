class SelectWorkspace {
    constructor(workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    async execute({ userId }) {
        if (!userId) {
            throw new Error('userId is required');
        }

        const workspaces = await this.workspaceRepository.findByUserId(userId);
        return workspaces;
    }
}

module.exports = SelectWorkspace;