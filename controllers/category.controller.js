const FetchCategoryService = require("../services/categories/FetchCategoryService");

async function fetchCategoriesController(req, res) {
    try {
        const { id } = req.query;
        const fetchedData = await FetchCategoryService(id);

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


module.exports = { fetchCategoriesController }