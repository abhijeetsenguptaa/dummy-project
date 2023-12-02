const express = require('express');
const { fetchProductController } = require('../controllers/product.controller');

const productRoute = express.Router();

productRoute.get('/', fetchProductController);

module.exports = productRoute;