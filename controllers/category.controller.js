const Category = require("../models/category.model");
const DeleteCategoryService = require("../services/categories/DeleteCategoryService");
const FetchCategoryService = require("../services/categories/FetchCategoryService");
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/category-images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});

async function postCategoriesController(req, res) {
    try {
        let image;
        if (req.file) {
            image = 'uploads/category-images/' + req.file.filename;
        }

        const { name, slug, icon, status, sorting_by } = req.body;

        const postingCategory = await Category.create({ name, slug, icon, status, sorting_by, image });

        return res.status(200).json({
            status: true,
            message: "Category has been created successfully.",
            data: postingCategory
        })
    } catch (error) {
        // Handling unexpected errors and logging them
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

async function updatingCategoriesController(req, res) {
    try {
        const categoryId = req.params.id; // Assuming you're passing category ID in the URL

        // Check if the category exists
        const existingCategory = await Category.findByPk(categoryId);

        if (!existingCategory) {
            return res.status(404).json({
                status: false,
                message: "Category not found."
            });
        }

        // Extract updated data from the request body
        const { name, slug, icon, status, sorting_by } = req.body;

        // Check if there's a new image uploaded
        let image = existingCategory.image;
        if (req.file) {
            image = 'uploads/category-images/' + req.file.filename;
        }

        // Update the category
        existingCategory.name = name;
        existingCategory.slug = slug;
        existingCategory.icon = icon;
        existingCategory.status = status;
        existingCategory.sorting_by = sorting_by;
        existingCategory.image = image;

        await existingCategory.save();

        return res.status(200).json({
            status: true,
            message: "Category has been updated successfully.",
            data: existingCategory
        });
    } catch (error) {
        // Handling unexpected errors and logging them
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


async function fetchCategoriesController(req, res) {
    try {
        const { id, sort } = req.query;
        const fetchedData = await FetchCategoryService(id, sort);

        return res.status(fetchedData.status ? 200 : 404).json({
            status: fetchedData.status,
            message: fetchedData.message,
            count: fetchedData.status ? fetchedData.count : 0,
            data: fetchedData.status ? fetchedData.data : null,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}

async function deleteCategoriesController(req, res) {
    try {
        const id = req.params.id;

        const deleteItem = await DeleteCategoryService(id);

        return res.status(deleteItem.status ? 200 : 404).json({
            status: deleteItem.status,
            message: deleteItem.message
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}


module.exports = { upload, fetchCategoriesController, postCategoriesController, updatingCategoriesController, deleteCategoriesController }