const express = require('express');
const { fetchCityController, postCityController, updateCityController, deleteCityController } = require('../controllers/cities.controller');


const cityRoute = express.Router();

cityRoute.get('/', fetchCityController);
cityRoute.post('/', postCityController);
cityRoute.put('/:id', updateCityController);
cityRoute.delete('/:id', deleteCityController);


module.exports = cityRoute;