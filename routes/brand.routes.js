const express = require('express');
const { postBrandController, fetchBrandController, updateBrandController, deleteBrandController,upload } = require('../controllers/brand.controller');


const BrandRoute = express.Router();

BrandRoute.post('/',upload.single('logo'), postBrandController);
BrandRoute.get('/', fetchBrandController);
BrandRoute.post('/:id', updateBrandController);
BrandRoute.delete('/:id', deleteBrandController);

module.exports = BrandRoute;