class ListController {
    constructor(selectList) {
        this.selectList = selectList;
    }

    async getListByWorkspaceId(req, res) {
        try {
            const { workspaceId } = req.body;
            const lists = await this.selectList.execute({ workspaceId });
            res.json({ lists });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ListController;