const State = require("../../models/state.model");

async function FetchStateService(id) {
    try {
        let stateData;
        if (id) {
            stateData = await State.findByPk(id);
        } else {
            stateData = await State.findAll();
        }

        return {
            status: true,
            message: 'State List!',
            count: stateData.length,
            data: stateData
        }
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: 'Error in fetching the state list.'
        }
    }
}

module.exports = FetchStateService;