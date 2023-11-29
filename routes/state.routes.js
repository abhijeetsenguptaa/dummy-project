const express = require('express');
const { fetchStateController, postStateController, updateStateController, deleteStateController } = require('../controllers/state.controller');


const stateRoute = express.Router();

stateRoute.get('/', fetchStateController);
stateRoute.post('/', postStateController);
stateRoute.put('/:id', updateStateController);
stateRoute.delete('/:id', deleteStateController);


module.exports = stateRoute;