const express = require('express');
const { fetchCountryController, postCountryController, updateCountryController, deleteCountryController } = require('../controllers/country.controller');

const countryRoute = express.Router();

countryRoute.get('/', fetchCountryController);
countryRoute.post('/', postCountryController);
countryRoute.put('/:id', updateCountryController);
countryRoute.delete('/:id', deleteCountryController);


module.exports = countryRoute;