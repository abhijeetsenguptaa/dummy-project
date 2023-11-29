const DeleteCityService = require("../services/cities/DeleteCityService");
const FetchCityService = require("../services/cities/FetchCityService");
const AddCityService = require("../services/cities/PostCityService");
const UpdateCityService = require("../services/cities/UpdateCityService");

async function fetchCityController(req, res) {
    try {
        const { id } = req.query;

        const cityData = await FetchCityService(id);

        return res.status(cityData.status ? 200 : 500).json({
            status: cityData.status,
            message: cityData.message,
            count: cityData.status ? cityData.count : 0,
            data: cityData.status ? cityData.data : null
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}

async function postCityController(req, res) {
    try {
        const { country_state_id, name, slug, status } = req.body;

        const cityInsert = await AddCityService(country_state_id, name, slug, status);

        return res.status(cityInsert.status ? 200 : 500).json({
            status: cityInsert.status,
            message: cityInsert.message,
            data: cityInsert.status ? cityInsert.data : null
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}



async function updateCityController(req, res) {
    try {
        const id = req.params.id;
        const { name, slug, status } = req.body;


        const cityUpdate = await UpdateCityService(id, name, slug, status);

        return res.status(cityUpdate.status ? 200 : 500).json({
            status: cityUpdate.status,
            message: cityUpdate.message,
            data: cityUpdate.status ? cityUpdate.data : null
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        });
    }
}



async function deleteCityController(req, res) {
    try {
        const id = req.params.id;

        const data = await DeleteCityService(id);

        return res.status(data.status ? 200 : 404).json({
            status: data.status,
            message: data.message
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}


module.exports = { fetchCityController, postCityController, updateCityController, deleteCityController };