const express = require('express');
// const PostBrandModelService = require('../services/brand_models/PostBrandModelService');
const { fetchBrandModelController } = require('../controllers/brand_model.controller');


const BrandModelRoute = express.Router();

// BrandModelRoute.post('/', postBrandController);
BrandModelRoute.get('/', fetchBrandModelController);
// BrandModelRoute.post('/:id', updateBrandController);
// BrandModelRoute.delete('/:id', deleteBrandController);

module.exports = BrandModelRoute;