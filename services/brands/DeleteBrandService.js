const Brand = require("../../models/brand.model");

async function DeleteBrandService(id) {
    try {
        // Input validation
        if (!Number.isInteger(id) || id <= 0) {
            return {
                status: false,
                message: 'Invalid brand ID provided.',
            };
        }

        // Find the brand by ID
        const existingBrand = await Brand.findByPk(id);

        // Check if the brand with the given ID exists
        if (!existingBrand) {
            return {
                status: false,
                message: 'Brand not found for the provided ID.',
            };
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
