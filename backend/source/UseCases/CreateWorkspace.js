class CreateWorkspace {
    constructor(workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    async execute({ title, userId }) {
        if (!userId || !title) {
            throw new Error('userId and title are required');
        }

        return await this.workspaceRepository.create(title, userId);
    }
}

module.exports = CreateWorkspace;