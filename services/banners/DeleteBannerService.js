const Banner_Image = require("../../models/banner_images.model");
const fs = require('fs').promises;

async function DeleteBannerService(id) {
    try {
        const deleteItem = await Banner_Image.findByPk(id);

        if (!deleteItem) {
            return {
                status: false,
                message: 'Item not found!'
            };
        }

        if (deleteItem.image) {
            await fs.unlink(deleteItem.image);
        }

        await deleteItem.destroy();

        return {
            status: true,
            message: 'Banner deleted successfully.'
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteBannerService;
