class WorkspaceController {
    constructor(selectWorkspace, createWorkspace, deleteWorkspace) {
        this.selectWorkspace = selectWorkspace;
        this.createWorkspace = createWorkspace;
        this.deleteWorkspace = deleteWorkspace;
    }

    async getWorkspaces(req, res) {
        try {
            const { userId } = req.body;
            const data = await this.selectWorkspace.execute({ userId });
            res.json({ data });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createWorkspaces(req, res) {
        try {
            const { title, description, userId } = req.body;
            const data = await this.createWorkspace.execute({ title, description, userId });
            res.json({ data });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async DeleteWorkspace(req, res) {
        try {
            const { id } = req.body;
            const data = await this.deleteWorkspace.execute( { id });
            res.json({ data });
        } catch (error) {
            res.status(400).json( { error: error.message });
        }
    }
}

module.exports = WorkspaceController;