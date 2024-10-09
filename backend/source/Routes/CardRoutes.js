const express = require('express');

const CardRepository = require('../Repositories/CardRepository');
const CreateCard = require('../UseCases/CreateCard');
const UpdateCard = require('../UseCases/UpdateCard');
const CardController = require('../Controller/CardController');

module.exports = (dbConnection) => {
    const router = express.Router();

    const cardRepository = new CardRepository(dbConnection);
    const createCard = new CreateCard(cardRepository);
    const updateCard = new UpdateCard(cardRepository);
    const cardController = new CardController(createCard, updateCard);

    router.get('/test', (req, res) => {
        res.json({ message: 'Test route' });
    });

    router.post('/create', (req, res) => cardController.createEmptyCard(req, res));
    router.post('/update', (req, res) => cardController.updateCardById(req, res));

    return router;
};