const express = require('express');

const ListRepository = require('../Repositories/ListRepository');
const SelectList = require('../UseCases/SelectList');
const CreateList = require('../UseCases/CreateList');
const UpdateList = require('../UseCases/UpdateList');
const ListController = require('../Controller/ListController');

module.exports = (dbConnection) => {
    const router = express.Router();

    const listRepository = new ListRepository(dbConnection);
    const selectList = new SelectList(listRepository);
    const createList = new CreateList(listRepository);
    const updateList = new UpdateList(listRepository);
    const listController = new ListController(selectList, createList, updateList);

    router.get('/test', (req, res) => {
        res.json({ message: 'Test route' });
    });

    router.post('/select', (req, res) => listController.GetListByWorkspaceId(req, res));
    router.post('/create', (req, res) => listController.CreateList(req, res));
    router.post('/update', (req, res) => listController.UpdateList(req, res));

    return router;
};