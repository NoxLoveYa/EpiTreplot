class RoomController {
    constructor(createRoom) {
        this.createRoom = createRoom;
    }

    async createRoom(req, res) {
        try {
            const { userId, workspaceId } = req.body;
            const data = await this.createRoom.execute({ userId, workspaceId });
            res.json({ data });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = RoomController;