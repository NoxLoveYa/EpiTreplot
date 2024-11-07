const express = require('express');

const WorkspaceRepository = require('../Repositories/WorkspaceRepository');
const SelectWorkspace = require('../UseCases/SelectWorkspace');
const CreateWorkspace = require('../UseCases/CreateWorkspace');
const DeleteWorkspace = require('../UseCases/DeleteWorkspace');
const UpdateWorkspace = require('../UseCases/UpdateWorkspace');
const WorkspaceController = require('../Controller/WorkspaceController');

module.exports = (dbConnection) => {
    const router = express.Router();

    const workspaceRepository = new WorkspaceRepository(dbConnection);
    const selectWorkspace = new SelectWorkspace(workspaceRepository);
    const createWorkspace = new CreateWorkspace(workspaceRepository);
    const deleteWorkspace = new DeleteWorkspace(workspaceRepository);
    const updateWorkspace = new UpdateWorkspace(workspaceRepository);
    const workspaceController = new WorkspaceController(selectWorkspace, createWorkspace, deleteWorkspace, updateWorkspace);

    router.get('/test', (req, res) => {
        res.json({ message: 'Test route' });
    });

    router.post('/select', (req, res) => workspaceController.getWorkspaces(req, res));
    router.post('/create', (req, res) => workspaceController.createWorkspaces(req, res));
    router.post('/delete', (req, res) => workspaceController.DeleteWorkspace(req, res));
    router.post('/update', (req, res) => workspaceController.UpdateWorkspace(req, res));

    return router;
};