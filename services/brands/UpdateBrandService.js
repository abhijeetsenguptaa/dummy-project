const Brand = require("../../models/brand.model");

async function UpdateBrandService(id, name, slug, logo, status) {
    try {
        // Input validation
        if (!Number.isInteger(id) || id <= 0) {
            return {
                status: false,
                message: 'Invalid brand ID provided.',
            };
        }

        // Fetch the brand by ID
        const existingBrand = await Brand.findByPk(id);

        // Check if the brand with the given ID exists
        if (!existingBrand) {
            return {
                status: false,
                message: 'Brand not found for the provided ID.',
            };
        }

        // Update the brand data if provided
        if (name) existingBrand.name = name;
        if (slug) existingBrand.slug = slug;
        if (logo) existingBrand.logo = logo;
        if (status !== undefined) existingBrand.status = status;

        // Save the changes to the database
        await existingBrand.save();

        return {
            status: true,
            message: 'Brand updated successfully!',
            data: existingBrand,
        };
    } catch (error) {
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = UpdateBrandService;
