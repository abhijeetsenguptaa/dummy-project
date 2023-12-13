const Banner_Image = require("../../models/banner_images.model");

async function FetchBannerService(id) {
    try {
        let fetchBannerData;
        if (id) {
            fetchBannerData = await Banner_Image.findOne({ where: { id: id } });

        } else {
            fetchBannerData = await Banner_Image.findAll({ where: { status: true } });
        }

        return {
            status: true,
            message : 'Banner Data',
            data: fetchBannerData,
        };

    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = FetchBannerService;
