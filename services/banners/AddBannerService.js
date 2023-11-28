const Banner_Image = require("../../models/banner_images.model");


async function AddBannerService(header, title, link, image, banner_location, after_product_qty, status, title_one, title_two, badge, product_slug) {
    try {
        const banner = new Banner_Image({header, title, link, image, banner_location, after_product_qty, status, title_one, title_two, badge, product_slug});

        await banner.save();

        return {
            status: true,
            message: "Banner has been added successfully."
        }
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        }
    }
}


module.exports = AddBannerService;