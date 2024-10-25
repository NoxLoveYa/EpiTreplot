const express = require('express');

const WorkspaceRepository = require('../Repositories/WorkspaceRepository');
const SelectWorkspace = require('../UseCases/SelectWorkspace');
const WorkspaceController = require('../Controller/WorkspaceController');

module.exports = (dbConnection) => {
    const router = express.Router();

    const workspaceRepository = new WorkspaceRepository(dbConnection);
    const selectWorkspace = new SelectWorkspace(workspaceRepository);
    const workspaceController = new WorkspaceController(selectWorkspace);

    router.get('/test', (req, res) => {
        res.json({ message: 'Test route' });
    });

    router.post('/select', (req, res) => workspaceController.getWorkspaces(req, res));

    return router;
};