const multer = require('multer');
const AddBannerService = require('../services/banners/AddBannerService');


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

async function postingBannerController(req,res) {
    try {
        const {header, title, link, banner_location, after_product_qty, status, title_one, title_two, badge, product_slug} = req.body;

        const image = 'uploads/banner-images' + req.file.filename;

        const bannerImage = await AddBannerService(header, title, link, image, banner_location, after_product_qty, status, title_one, title_two, badge, product_slug);

        return res.status(bannerImage.status ? 200 : 404).json({
            
        })
    } catch (error) {
        
    }
}