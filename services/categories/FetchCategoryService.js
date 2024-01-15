const Category = require("../../models/category.model");

async function FetchCategoryService(id, sort) {
    try {
        let categories;

        if (id) {
            categories = await Category.findAll({ where: { id } });
        } else {
            const sortOrder = sort ? 'DESC' : 'ASC';
            categories = await Category.findAll({ order: [['sorting_by', sortOrder]] });
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
