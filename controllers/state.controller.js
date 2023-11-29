const DeleteStateService = require("../services/states/DeleteStateService");
const FetchStateService = require("../services/states/FetchStateService");
const AddStateService = require("../services/states/PostStateService");
const UpdateStateService = require("../services/states/UpdateStateService");

async function fetchStateController(req, res) {
    try {
        const { id } = req.query;

        const stateData = await FetchStateService(id);

        return res.status(stateData.status ? 200 : 500).json({
            status: stateData.status,
            message: stateData.message,
            count: stateData.status ? stateData.count : 0,
            data: stateData.status ? stateData.data : null
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}

async function postStateController(req, res) {
    try {
        const { country_id, name, slug, status } = req.body;

        const stateInsert = await AddStateService(country_id, name, slug, status);

        return res.status(stateInsert.status ? 200 : 500).json({
            status: stateInsert.status,
            message: stateInsert.message,
            data: stateInsert.status ? stateInsert.data : null
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}



async function updateStateController(req, res) {
    try {
        const id = req.params.id;
        const { name, slug, status } = req.body;


        const stateUpdate = await UpdateStateService(id, name, slug, status);

        return res.status(stateUpdate.status ? 200 : 500).json({
            status: stateUpdate.status,
            message: stateUpdate.message,
            data: stateUpdate.status ? stateUpdate.data : null
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        });
    }
}



async function deleteStateController(req, res) {
    try {
        const id = req.params.id;

        const data = await DeleteStateService(id);

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


module.exports = { fetchStateController, postStateController, updateStateController, deleteStateController };