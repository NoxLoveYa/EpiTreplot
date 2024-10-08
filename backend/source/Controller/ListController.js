class ListController {
    constructor(selectList, createList) {
        this.selectList = selectList;
        this.createList = createList;
        console.log('ListController -> selectList: ', selectList);
        console.log('ListController -> createList: ', createList);
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

    async createEmptyList(req, res) {
        try {
            const { title, description, workspaceId } = req.body;
            const list = await this.createList.execute({ title, description, workspaceId });
            res.json({ list });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ListController;