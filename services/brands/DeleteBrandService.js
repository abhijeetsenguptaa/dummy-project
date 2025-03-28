const Brand = require("../../models/brand.model");
const fs = require('fs').promises;

async function DeleteBrandService(id) {
    try {
        // Find the brand by ID
        const existingBrand = await Brand.findByPk(id);

        // Check if the brand with the given ID exists
        if (!existingBrand) {
            return {
                status: false,
                message: 'Brand not found for the provided ID.',
            };
        }

        // Assuming you have an 'logo' property in the Category model
        const imagePath = existingBrand.logo;

        // Unlink the image file (assuming it's stored locally)
        if (imagePath) {
            await fs.unlink(imagePath);
        }

        // Delete the brand
        await existingBrand.destroy();

        return {
            status: true,
            message: 'Brand deleted successfully!',
        };
    } catch (error) {
        console.error(error.message); // Log the error for debugging purposes

        return {
            status: false,
            message: 'Error in deleting the brand.',
        };
    }
}

module.exports = DeleteBrandService;
