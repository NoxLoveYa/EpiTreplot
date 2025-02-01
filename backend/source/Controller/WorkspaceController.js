class WorkspaceController {
    constructor(selectWorkspace, createWorkspace, deleteWorkspace, updateWorkspace) {
        this.selectWorkspace = selectWorkspace;
        this.createWorkspace = createWorkspace;
        this.deleteWorkspace = deleteWorkspace;
        this.updateWorkspace = updateWorkspace;
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
            const { title, userId } = req.body;
            const data = await this.createWorkspace.execute({ title, userId });
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

    async UpdateWorkspace(req, res) {
        try {
            const { id, title, description } = req.body;
            const data = await this.updateWorkspace.execute( { id, title });
            res.json({ data });
        } catch (error) {
            res.status(400).json( { error: error.message });
        }
    }
}

module.exports = WorkspaceController;