const FetchBrandModelService = require("../services/brand_models/FetchBrandModelService");

async function fetchBrandModelController(req, res) {
    try {
        const { id, status } = req.query;

        const fetchedModelData = await FetchBrandModelService(id,status);

        return res.status(fetchedModelData.status ? 200 : 404).json({
            status : fetchedModelData.status,
            count : fetchedModelData.count,
            data : fetchedModelData.data,
            message : fetchedModelData.message
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


module.exports = { fetchBrandModelController }