const express = require('express');
const authentication = require('../middleware/authentication.middleware');
const { postingShoppingCartController, fetchingShoppingCartController, updatingShoppingCartController, deleteShoppingCartController } = require('../controllers/shopping_cart.controller');
const ShoppingCartRoute = express.Router();

ShoppingCartRoute.post('/:id', authentication, postingShoppingCartController);
ShoppingCartRoute.get('/', authentication, fetchingShoppingCartController);
ShoppingCartRoute.put('/:id', authentication, updatingShoppingCartController);
ShoppingCartRoute.delete('/:id', authentication, deleteShoppingCartController);

module.exports = ShoppingCartRoute;