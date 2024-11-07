class UpdateWorkspace {
    constructor(workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    async execute({ id, title, description }) {
        if (!id) {
            throw new Error('workspace id is required');
        }

        title == undefined ? title = null : title
        description == undefined ? description = null : description;

        const list = await this.workspaceRepository.update(id, title, description);
        return list;
    }
}

module.exports = UpdateWorkspace;