class WorkspaceController {
    constructor(selectWorkspace) {
        this.selectWorkspace = selectWorkspace;
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
}

module.exports = WorkspaceController;