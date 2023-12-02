const express = require('express');
const { fetchCategoriesController } = require('../controllers/category.controller');


const categoryRoute = express.Router();

// categoryRoute.post('/', postBrandController);
categoryRoute.get('/', fetchCategoriesController);
// categoryRoute.post('/:id', updateBrandController);
// categoryRoute.delete('/:id', deleteBrandController);

module.exports = categoryRoute;