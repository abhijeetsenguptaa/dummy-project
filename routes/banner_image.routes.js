const express = require('express');
const { postingBannerController, upload, fetchingBannerController } = require('../controllers/banner_image.controller');
const bannerImageRoute = express.Router();

bannerImageRoute.post('/', upload.single('image'), postingBannerController);
bannerImageRoute.get('/', fetchingBannerController);
module.exports = bannerImageRoute;