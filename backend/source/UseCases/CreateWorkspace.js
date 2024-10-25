class CreateWorkspace {
    constructor(workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    async execute({ title, description, userId }) {
        if (!userId || !title) {
            throw new Error('userId and title are required');
        }

        description == undefined ? description = null : description;

        const list = await this.workspaceRepository.create(title, description, null, userId);
        return list;
    }
}

module.exports = CreateWorkspace;