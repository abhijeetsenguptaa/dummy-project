const { Op } = require("sequelize");
const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const Brand_Model = require("../../models/brand_model.model");
const Brand = require("../../models/brand.model");

async function FetchProductService(id, brand, model, category, low, high, product_condition, page, limit, highlight, sort) {
    try {
        const whereConditions = {};

        if (id) {
            whereConditions.id = id;
        }

        if (brand) {
            whereConditions.brand_id = brand;
        }

        if (model) {
            whereConditions.brand_model_id = model;
        }

        if (category) {
            whereConditions.category_id = category;
        }

        if (low) {
            whereConditions.price = {
                [Op.gte]: low, // Filter products with price greater than or equal to priceLow
            };
        }

        if (high) {
            whereConditions.price = {
                ...whereConditions.price,
                [Op.lte]: high, // Filter products with price less than or equal to priceHigh
            };
        }

        if (product_condition == "new") {
            whereConditions.is_condition = "new";
        } else if (product_condition == "old") {
            whereConditions.is_condition = "old";
        }

        if (highlight == "top") {
            whereConditions.is_top = true;
        } else if (highlight == "best") {
            whereConditions.is_best = true;
        }

        const order = [];
        if (sort === "priceHighToLow") {
            order.push(['price', 'DESC']);
        } else if (sort === "priceLowToHigh") {
            order.push(['price', 'ASC']);
        }

        const { rows, count } = await Product.findAndCountAll({
            where: whereConditions,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            include: [Category,Brand_Model,Brand],
            order: order, // Add the order option for sorting
        });

        return {
            status: true,
            message: 'List of All the Available Products',
            totalCount: count,
            data: rows,
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message : error.message,
        };
    }
}

module.exports = FetchProductService;