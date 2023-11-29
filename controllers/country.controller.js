const AddCountryService = require("../services/countries/AddCountryService");
const DeleteCountryService = require("../services/countries/DeleteCountryService");
const FetchCountryService = require("../services/countries/FetchCountryService");
const UpdateCountryService = require("../services/countries/UpdateCountryService");

async function fetchCountryController(req, res) {
    try {
        const { id } = req.query;

        const countryData = await FetchCountryService(id);

        return res.status(countryData.status ? 200 : 500).json({
            status: countryData.status,
            message: countryData.message,
            count: countryData.status ? countryData.count : 0,
            data: countryData.status ? countryData.data : null
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}

async function postCountryController(req, res) {
    try {
        const { name, slug, status } = req.body;

        const countryInsert = await AddCountryService(name, slug, status);

        return res.status(countryInsert.status ? 200 : 500).json({
            status: countryInsert.status,
            message: countryInsert.message,
            data: countryInsert.status ? countryInsert.data : null
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}



async function updateCountryController(req, res) {
    try {
        const id = req.params.id;
        const { name, slug, status } = req.body;


        const countryUpdate = await UpdateCountryService(id, name, slug, status);

        return res.status(countryUpdate.status ? 200 : 500).json({
            status: countryUpdate.status,
            message: countryUpdate.message,
            data: countryUpdate.status ? countryUpdate.data : null
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        });
    }
}



async function deleteCountryController(req, res) {
    try {
        const id = req.params.id;

        const data = await DeleteCountryService(id);

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


module.exports = { fetchCountryController, postCountryController, updateCountryController, deleteCountryController };