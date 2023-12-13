const express = require('express');
const { fetchProductController, postProductController, fetchOneProductController, upload } = require('../controllers/product.controller');

const productRoute = express.Router();

productRoute.get('/', fetchProductController);
productRoute.get('/:id', fetchOneProductController);
productRoute.post('/', upload.array('images', 5), postProductController);

module.exports = productRoute;