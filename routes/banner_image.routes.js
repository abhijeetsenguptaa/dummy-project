const express = require('express');
const { postingBannerController, upload, fetchingBannerController, deleteBannerController, statusHandlerController } = require('../controllers/banner_image.controller');
const bannerImageRoute = express.Router();

bannerImageRoute.post('/', upload.single('image'), postingBannerController);
bannerImageRoute.get('/', fetchingBannerController);
bannerImageRoute.delete('/:id', deleteBannerController);
bannerImageRoute.patch('/:id', statusHandlerController);


module.exports = bannerImageRoute;