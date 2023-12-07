const express = require('express');
const authentication = require('../middleware/authentication.middleware');
const { postRecentSearchesController, fetchRecentSearchesController } = require('../controllers/recentSearch.controller');


const RecentSearchesRoute = express.Router();

RecentSearchesRoute.post('/:id', authentication, postRecentSearchesController);
RecentSearchesRoute.get('/', authentication, fetchRecentSearchesController);


module.exports = RecentSearchesRoute;