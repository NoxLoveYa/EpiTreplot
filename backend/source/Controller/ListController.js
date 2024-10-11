class ListController {
    constructor(selectList, createList, updateList) {
        this.selectList = selectList;
        this.createList = createList;
        this.updateList = updateList;
    }

    async GetListByWorkspaceId(req, res) {
        try {
            const { workspaceId } = req.body;
            const lists = await this.selectList.execute({ workspaceId });
            res.json({ lists });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async CreateList(req, res) {
        try {
            const { title, description, workspaceId } = req.body;
            const list = await this.createList.execute({ title, description, workspaceId });
            res.json({ list });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async UpdateList(req, res) {
        try {
            const { id, title, description } = req.body;
            const list = await this.updateList.execute({ id, title, description });
            res.json({ list });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ListController;