const FetchProductService = require("../services/products/FetchProductService");

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


module.exports = { fetchProductController };