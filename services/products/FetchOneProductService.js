const Brand = require("../../models/brand.model");
const Brand_Model = require("../../models/brand_model.model");
const Category = require("../../models/category.model");
const Product = require("../../models/product.model");
const Vendors = require("../../models/vendor.model");
const cheerio = require('cheerio');
const { Op } = require("sequelize");
async function FetchOneProductService(id) {
    try {
        const data = await Product.findOne({
            where: { id },
            include: [
                { model: Vendors },
                { model: Category },
                { model: Brand_Model },
                { model: Brand }
            ]
        });


        // Check if the 'long_desc' field is present in the data
        if (data && data.long_description) {
            // Load the 'long_desc' HTML content into Cheerio
            const $ = cheerio.load(data.long_description);

            // Extract the text content from the HTML
            const plainText = $.text();

            // Update the 'data' object with the plain text content
            data.long_description = plainText;
        }


        const dataFromOtherSeller = await Product.findAll({
            where: {
                brand_model_id: data.brand_model_id,
                vendor_id: { [Op.ne]: data.vendor_id }
            },
            include: [
                { model: Vendors },
                { model: Category },
                { model: Brand_Model },
                { model: Brand }
            ]
        });

        const similarPhones = await Product.findAll({
            where: {
                brand_model_id: data.brand_model_id,
                id: { [Op.ne]: data.id }
            },
            include: [
                { model: Vendors },
                { model: Category },
                { model: Brand_Model },
                { model: Brand }
            ]
        })

        return {
            status: true,
            message: `Product with item ID: ${id}`,
            data: data,
            dataFromOtherSeller: dataFromOtherSeller,
            similarPhones: similarPhones
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = FetchOneProductService;