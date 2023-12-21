const express = require('express');
const { fetchCategoriesController, postCategoriesController, upload } = require('../controllers/category.controller');


const categoryRoute = express.Router();

categoryRoute.post('/', upload.single('image'), postCategoriesController);
categoryRoute.get('/', fetchCategoriesController);
// categoryRoute.post('/:id', updateBrandController);
// categoryRoute.delete('/:id', deleteBrandController);

module.exports = categoryRoute;