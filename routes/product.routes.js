const express = require('express');
const { fetchProductController, postProductController } = require('../controllers/product.controller');

const productRoute = express.Router();

productRoute.get('/', fetchProductController);
productRoute.post('/', postProductController);

module.exports = productRoute;