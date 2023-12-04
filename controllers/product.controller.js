const FetchProductService = require("../services/products/FetchProductService");
const PostProductService = require("../services/products/PostProductService");

async function fetchProductController(req, res) {
    try {
        const { id, brand, model, category, low, high, product_condition, page = 1, limit = 10, highlight, sort } = req.query;

        const productsData = await FetchProductService(id, brand, model, category, low, high, product_condition, page, limit, highlight, sort);

        return res.status(productsData.status ? 200 : 404).json({
            status: productsData.status,
            message: productsData.message,
            totalCount: productsData.status ? productsData.totalCount : 0,
            data: productsData.status ? productsData.data : null
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

async function postProductController(req, res) {
    try {
        const { name, short_name, slug, thumb_image, vendor_id, category_id, brand_id, qty, weight, sold_qty, short_description, long_description, video_link, sku, imei, seo_title, seo_description, price, offer_price, tags, show_homepage, is_undefine, is_featured, new_product, is_top, is_best, status, is_specification, is_refurbished, is_condition, brand_model_id, battery_condition, product_condition, approve_by_admin } = req.body;

        const postingProduct = await PostProductService(name, short_name, slug, thumb_image, vendor_id, category_id, brand_id, qty, weight, sold_qty, short_description, long_description, video_link, sku, imei, seo_title, seo_description, price, offer_price, tags, show_homepage, is_undefine, is_featured, new_product, is_top, is_best, status, is_specification, is_refurbished, is_condition, brand_model_id, battery_condition, product_condition, approve_by_admin)

        return res.status(postingProduct.status ? 200 : 404).json({
            status: postingProduct.status,
            message: postingProduct.message,
            data: postingProduct.status ? postingProduct.data : null
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
module.exports = { fetchProductController, postProductController };