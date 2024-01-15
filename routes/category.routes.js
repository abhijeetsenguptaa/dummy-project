const express = require('express');
const { fetchCategoriesController, postCategoriesController, upload, deleteCategoriesController, updatingCategoriesController } = require('../controllers/category.controller');


const categoryRoute = express.Router();

categoryRoute.post('/', upload.single('image'), postCategoriesController);
categoryRoute.get('/', fetchCategoriesController);
categoryRoute.patch('/:id', updatingCategoriesController);
categoryRoute.delete('/:id', deleteCategoriesController);

module.exports = categoryRoute;