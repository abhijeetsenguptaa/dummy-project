const Country = require("../../models/country.model");

async function UpdateCountryService(id, name, slug, status) {
    try {
        const existingCountry = await Country.findByPk(id);

        if (!existingCountry) {
            return {
                status: false,
                message: 'Country not found for the provided ID.',
            };
        }

        // Update the country attributes
        existingCountry.name = name;
        existingCountry.slug = slug;
        existingCountry.status = status;

        // Save the changes to the database
        const updatedCountry = await existingCountry.save();

        return {
            status: true,
            message: 'Country updated successfully!',
            data: updatedCountry,
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: 'Error in updating the country.',
        };
    }
}

module.exports = UpdateCountryService;
