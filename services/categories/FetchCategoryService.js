const Category = require("../../models/category.model");

async function FetchCategoryService(id) {
    try {
        let categories;

        if (id) {
            categories = await Category.findAll({ where: { id } });
        } else {
            categories = await Category.findAll();
        }

        if (!categories.length) {
            return {
                status: false,
                message: "No categories found"
            };
        }

        return {
            status: true,
            message: "Categories fetched successfully",
            count: categories.length,
            data: categories
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = FetchCategoryService;