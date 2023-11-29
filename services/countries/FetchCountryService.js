const Country = require("../../models/country.model");

async function FetchCountryService(id) {
    try {
        let countriesData;
        if (id) {
            countriesData = await Country.findByPk(id);
        } else {
            countriesData = await Country.findAll();
        }

        return {
            status: true,
            message: 'Country List!',
            count: countriesData.length,
            data: countriesData
        }
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: 'Error in fetching the country list.'
        }
    }
}

module.exports = FetchCountryService;