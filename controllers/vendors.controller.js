const FetchVendorService = require("../services/vendors/FetchVendorService");
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/vendor-images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});

async function postVendorController(req, res) {
    try {
        const banner_image = req.file.filename;
        const logo = req.file.filename;

        const { user_id, total_amount, phone, email, shop_name, slug, open_at, closed_at, address, flat, street, city, state, country, pincode, seo_title, seo_description, status, is_featured, top_rated, verified_token, aadhar_no, pan_no, gst_no, is_verified, aadhar_pdf, pan_pdf, cancel_checkpdf, kyc_complete, greeting_ms, password } = req.body;

    } catch (error) {
        // Handling unexpected errors and logging them
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}
async function fetchVendorController(req, res) {
    try {
        const vendorsData = await FetchVendorService();

        return res.status(vendorsData.status ? 200 : 404).json({
            status: vendorsData.status,
            message: vendorsData.message,
            count: vendorsData.status ? vendorsData.count : 0,
            data: vendorsData.status ? vendorsData.data : null
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

module.exports = { upload,fetchVendorController };