const express = require('express');
const { postBrandController, fetchBrandController, updateBrandController, deleteBrandController } = require('../controllers/brand.controller');


const BrandRoute = express.Router();

BrandRoute.post('/', postBrandController);
BrandRoute.get('/', fetchBrandController);
BrandRoute.put('/:id', updateBrandController);
BrandRoute.delete('/:id', deleteBrandController);

module.exports = BrandRoute;