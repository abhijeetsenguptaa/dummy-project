const Country = require("../../models/country.model");

async function AddCountryService(name, slug, status) {
    try {
        const countryData = await Country.create({ name, slug, status });

        return {
            status: true,
            message: 'Country added successfully!',
            data: countryData
        };

    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: 'Error in adding the country.'
        };
    }
}

module.exports = AddCountryService;
