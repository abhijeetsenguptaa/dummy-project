const multer = require('multer');
const Banner_Image = require('../models/banner_images.model');
const FetchBannerService = require('../services/banners/FetchBannerService');


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/banner-images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});

async function postingBannerController(req, res) {
    try {
        let image = '';
        if (req.file){
            image = 'uploads/banner-images/' + req.file.filename;;
        }

        const { header, title, link, banner_location, after_product_qty, status, title_one, title_two, badge, product_slug } = req.body;

        const bannerInsert = await Banner_Image.create({ header, title, link, image, banner_location, after_product_qty, status, title_one, title_two, badge, product_slug });
        console.log(bannerInsert);
        return res.status(500).json({
            status: true,
            message: "Banner Posted Successfully.",
            data: bannerInsert
        });
    } catch (error) {
        // Handling unexpected errors and logging them
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

async function fetchingBannerController(req, res) {
    try {
        const { id } = req.query;

        const fetchBannerData = await FetchBannerService(id);

        return res.status(fetchBannerData.status ? 200 : 404).json({
            status: fetchBannerData.status,
            message: fetchBannerData.message,
            data: fetchBannerData.status ? fetchBannerData.data : null
        })
    } catch (error) {
        // Handling unexpected errors and logging them
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = { upload, postingBannerController, fetchingBannerController };