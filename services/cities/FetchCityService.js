const City = require("../../models/city.model");

async function FetchCityService(id) {
    try {
        let cityData;

        // If ID is provided, fetch a specific city; otherwise, fetch all cities.
        if (id) {
            cityData = await City.findByPk(id);

            // Check if the city with the given ID exists
            if (!cityData) {
                return {
                    status: false,
                    message: 'City not found for the provided ID.',
                    count: 0,
                    data: null
                };
            }
        } else {
            cityData = await City.findAll();
        }

        return {
            status: true,
            message: id ? 'City details retrieved successfully!' : 'City list retrieved successfully!',
            count: cityData.length,
            data: cityData
        };
    } catch (error) {
        console.error(error.message); // Log the error for debugging purposes

        return {
            status: false,
            message: 'Error in fetching city data. Please try again later.',
            count: 0,
            data: null
        };
    }
}

module.exports = FetchCityService;
