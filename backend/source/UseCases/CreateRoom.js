class CreateRoom {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }

    async execute({ userId, workspaceId }) {
        if (!userId || !workspaceId) {
            throw new Error('userId and workspaceId are required');
        }

        const room = await this.roomRepository.createRoom(userId, workspaceId);
        return room;
    }
}

module.exports = CreateRoom;