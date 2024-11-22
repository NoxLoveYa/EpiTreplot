const express = require('express');

const RoomRepository = require('../Repositories/RoomRepository');
const CreateRoom = require('../UseCases/CreateRoom');
const RoomController = require('../Controller/RoomController');

module.exports = (dbConnection) => {
    const router = express.Router();

    const roomRepository = new RoomRepository(dbConnection);
    const createRoom = new CreateRoom(roomRepository);
    const roomController = new RoomController(createRoom);

    router.get('/test', (req, res) => {
        res.json({ message: 'Test route' });
    });

    router.post('/create', (req, res) => roomController.CreateRoom(req, res));

    return router;
};