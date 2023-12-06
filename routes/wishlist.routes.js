const express = require('express');
const authentication = require('../middleware/authentication.middleware');
const { postWishlistController, fetchWishlistController } = require('../controllers/wishlist.controller');

const wishlistRoute = express.Router();

wishlistRoute.post('/:id', authentication, postWishlistController);
wishlistRoute.get('/', authentication, fetchWishlistController);


module.exports = wishlistRoute;