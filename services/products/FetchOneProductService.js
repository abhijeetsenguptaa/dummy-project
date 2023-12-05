const Product = require("../../models/product.model");
const Vendors = require("../../models/vendor.model");
const cheerio = require('cheerio');

async function FetchOneProductService(id) {
    try {
        const data = await Product.findOne({ where: { id }, include: [{ model: Vendors }] });

        // Check if the 'long_desc' field is present in the data
        if (data && data.long_description) {
            // Load the 'long_desc' HTML content into Cheerio
            const $ = cheerio.load(data.long_description);

            // Extract the text content from the HTML
            const plainText = $.text();

            // Update the 'data' object with the plain text content
            data.long_description = plainText;
        }

        return {
            status: true,
            message: `Product with item ID: ${id}`,
            data: data
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