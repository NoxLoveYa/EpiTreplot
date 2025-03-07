class ListController {
    constructor(selectList, createList, updateList, deleteList, duplicateList) {
        this.selectList = selectList;
        this.createList = createList;
        this.updateList = updateList;
        this.deleteList = deleteList;
        this.duplicateList = duplicateList;
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
            const { title, workspaceId } = req.body;
            const list = await this.createList.execute({ title, workspaceId });
            res.json({ list });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async UpdateList(req, res) {
        try {
            const { id, title } = req.body;
            const list = await this.updateList.execute({ id, title });
            res.json({ list });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async DeleteList(req, res) {
        try {
            const { id } = req.body;
            const data = await this.deleteList.execute({ id });
            res.json({ data });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async DuplicateList(req, res) {
        try {
            const { id } = req.body;
            const list = await this.duplicateList.execute({ id });
            res.json({ list });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ListController;