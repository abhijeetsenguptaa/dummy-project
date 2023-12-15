const express = require('express');
const authentication = require('../middleware/authentication.middleware');
const { postingShoppingCartController, fetchingShoppingCartController, updatingShoppingCartController } = require('../controllers/shopping_cart.controller');
const ShoppingCartRoute = express.Router();

ShoppingCartRoute.post('/:id', authentication, postingShoppingCartController);
ShoppingCartRoute.get('/', authentication, fetchingShoppingCartController);
ShoppingCartRoute.put('/:id', authentication, updatingShoppingCartController);

module.exports = ShoppingCartRoute;