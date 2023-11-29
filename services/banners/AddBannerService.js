const Banner_Image = require("../../models/banner_images.model");


async function AddBannerService(header, title, link, image, banner_location, after_product_qty, status, title_one, title_two, badge, product_slug) {
    try {
        const banner = await Banner_Image.create({header, title, link, image, banner_location, after_product_qty, status, title_one, title_two, badge, product_slug});

        return {
            status: true,
            message: "Banner has been added successfully.",
            data: banner
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