const City = require("../../models/city.model");


async function AddCityService(country_state_id, name, slug, status) {
    try {
        const cityData = await City.create({ country_state_id, name, slug, status });

        return {
            status: true,
            message: 'City added successfully!',
            data: cityData
        };

    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: 'Error in adding the city.'
        };
    }
}

module.exports = AddCityService;
