const express = require('express');
const { fetchBrandModelController, postBrandModelController, upload } = require('../controllers/brand_model.controller');


const BrandModelRoute = express.Router();

BrandModelRoute.post('/', upload.single('logo'), postBrandModelController);
BrandModelRoute.get('/', fetchBrandModelController);
// BrandModelRoute.post('/:id', updateBrandController);
// BrandModelRoute.delete('/:id', deleteBrandController);

module.exports = BrandModelRoute;