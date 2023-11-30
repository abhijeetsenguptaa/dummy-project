const DeleteBrandService = require("../services/brands/DeleteBrandService");
const FetchBrandService = require("../services/brands/FetchBrandService");
const PostBrandService = require("../services/brands/PostBrandService");
const UpdateBrandService = require("../services/brands/UpdateBrandService");

async function postBrandController(req, res) {
    try {
        // Extracting data from the request body
        const { name, slug, logo, status } = req.body;

        // Calling the service to handle brand creation
        const brandInsert = await PostBrandService(name, slug, logo, status);

        // Sending response based on the service result
        return res.status(brandInsert.status ? 200 : 500).json({
            status: brandInsert.status,
            message: brandInsert.message,
            data: brandInsert.status ? brandInsert.data : null
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

async function fetchBrandController(req, res) {
    try {
        // Extracting data from the query parameters
        const { id } = req.query;

        // Calling the service to handle brand data retrieval
        const fetchData = await FetchBrandService(id);

        // Sending response based on the service result
        return res.status(fetchData.status ? 200 : 404).json({
            status: fetchData.status,
            message: fetchData.message,
            count: fetchData.status ? fetchData.count : 0,
            data: fetchData.status ? fetchData.data : null
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

async function updateBrandController(req, res) {
    try {
        // Extracting brand ID from the request parameters
        const id = req.params.id;

        const { name, slug, logo, status } = req.body;
        
        // Calling the service to handle brand data update
        const updateBrandData = await UpdateBrandService(id, name, slug, logo, status );

        // Sending response based on the service result
        return res.status(updateBrandData.status ? 200 : 404).json({
            status: updateBrandData.status,
            message: updateBrandData.message,
            data: updateBrandData.status ? updateBrandData.data : null
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

async function deleteBrandController(req, res) {
    try {
        // Extracting brand ID from the request parameters
        const id = req.params.id;

        // Calling the service to handle brand deletion
        const deleteBrandData = await DeleteBrandService(id);

        // Sending response based on the service result
        return res.status(deleteBrandData.status ? 200 : 404).json({
            status: deleteBrandData.status,
            message: deleteBrandData.message,
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

module.exports = { postBrandController, fetchBrandController, deleteBrandController, updateBrandController };
