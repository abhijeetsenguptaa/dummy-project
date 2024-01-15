const Category = require("../../models/category.model");
const fs = require('fs').promises; 

async function DeleteCategoryService(id) {
    try {
        const requiredCategory = await Category.findByPk(id);

        if (!requiredCategory) {
            return {
                status: false,
                message: `Category with ${id} not found!`
            };
        }

        // Assuming you have an 'imagePath' property in the Category model
        const imagePath = requiredCategory.image;

        // Unlink the image file (assuming it's stored locally)
        if (imagePath) {
            await fs.unlink(imagePath);
        }

        await requiredCategory.destroy();

        return {
            status: true,
            message: `Category with id ${id} and associated image deleted successfully.`
        };

    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteCategoryService;
