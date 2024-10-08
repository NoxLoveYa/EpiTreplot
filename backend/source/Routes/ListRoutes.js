const express = require('express');

const ListRepository = require('../Repositories/ListRepository');
const SelectList = require('../UseCases/SelectList');
const CreateList = require('../UseCases/CreateList');
const ListController = require('../Controller/ListController');

module.exports = (dbConnection) => {
    const router = express.Router();

    const listRepository = new ListRepository(dbConnection);
    const selectList = new SelectList(listRepository);
    const createList = new CreateList(listRepository);
    const listController = new ListController(selectList, createList);

    router.get('/test', (req, res) => {
        res.json({ message: 'Test route' });
    });

    router.post('/select', (req, res) => listController.getListByWorkspaceId(req, res));
    router.post('/create', (req, res) => listController.createEmptyList(req, res));

    return router;
};