const State = require("../../models/state.model");


async function AddStateService(country_id, name, slug, status) {
    try {
        const stateData = await State.create({ country_id, name, slug, status });

        return {
            status: true,
            message: 'State added successfully!',
            data: stateData
        };

    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: 'Error in adding the state.'
        };
    }
}

module.exports = AddStateService;
