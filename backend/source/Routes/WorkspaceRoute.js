const express = require('express');

const WorkspaceRepository = require('../Repositories/WorkspaceRepository');
const SelectWorkspace = require('../UseCases/SelectWorkspace');
const CreateWorkspace = require('../UseCases/CreateWorkspace');
const DeleteWorkspace = require('../UseCases/DeleteWorkspace');
const WorkspaceController = require('../Controller/WorkspaceController');

module.exports = (dbConnection) => {
    const router = express.Router();

    const workspaceRepository = new WorkspaceRepository(dbConnection);
    const selectWorkspace = new SelectWorkspace(workspaceRepository);
    const createWorkspace = new CreateWorkspace(workspaceRepository);
    const deleteWorkspace = new DeleteWorkspace(workspaceRepository);
    const workspaceController = new WorkspaceController(selectWorkspace, createWorkspace, deleteWorkspace);

    router.get('/test', (req, res) => {
        res.json({ message: 'Test route' });
    });

    router.post('/select', (req, res) => workspaceController.getWorkspaces(req, res));
    router.post('/create', (req, res) => workspaceController.createWorkspaces(req, res));
    router.post('/delete', (req, res) => workspaceController.DeleteWorkspace(req, res));

    return router;
};