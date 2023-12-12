const express = require('express');
const authentication = require('../middleware/authentication.middleware');
const { postWishlistController, fetchWishlistController, DeleteWishlistController } = require('../controllers/wishlist.controller');

const wishlistRoute = express.Router();

wishlistRoute.post('/:id', authentication, postWishlistController);
wishlistRoute.get('/', authentication, fetchWishlistController);
wishlistRoute.delete('/:id', authentication, DeleteWishlistController);

module.exports = wishlistRoute;