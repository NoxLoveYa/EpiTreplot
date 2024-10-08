const express = require('express');

const ListRepository = require('../Repositories/ListRepository');
const SelectList = require('../UseCases/SelectList');
const ListController = require('../Controller/ListController');

module.exports = (dbConnection) => {
    const router = express.Router();

    const listRepository = new ListRepository(dbConnection);
    const selectList = new SelectList(listRepository);
    const listController = new ListController(selectList);

    router.get('/test', (req, res) => {
        res.json({ message: 'Test route' });
    });

    router.post('/select', (req, res) => listController.getListByWorkspaceId(req, res));

    return router;
};