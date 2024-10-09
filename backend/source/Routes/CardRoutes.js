const express = require('express');

const CardRepository = require('../Repositories/CardRepository');
const CreateCard = require('../UseCases/CreateCard');
const CardController = require('../Controller/CardController');

module.exports = (dbConnection) => {
    const router = express.Router();

    const cardRepository = new CardRepository(dbConnection);
    const createCard = new CreateCard(cardRepository);
    const cardController = new CardController(createCard);

    router.get('/test', (req, res) => {
        res.json({ message: 'Test route' });
    });

    router.post('/create', (req, res) => cardController.createEmptyCard(req, res));

    return router;
};