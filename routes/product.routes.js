const express = require('express');
const { fetchProductController, postProductController, fetchOneProductController } = require('../controllers/product.controller');

const productRoute = express.Router();

productRoute.get('/', fetchProductController);
productRoute.get('/:id', fetchOneProductController);
productRoute.post('/', postProductController);

module.exports = productRoute;