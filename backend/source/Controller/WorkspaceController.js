class WorkspaceController {
    constructor(selectWorkspace, createWorkspace) {
        this.selectWorkspace = selectWorkspace;
        this.createWorkspace = createWorkspace
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
}

module.exports = WorkspaceController;