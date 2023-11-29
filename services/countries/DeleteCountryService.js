const Country = require("../../models/country.model");

async function DeleteCountryService(id) {
    try {
        if (!id) {
            return {
                status: false,
                message: 'ID is required for deletion.',
            };
        }

        const dataToBeDeleted = await Country.findByPk(id);

        if (!dataToBeDeleted) {
            return {
                status: false,
                message: 'Country not found for the provided ID.',
            };
        }

        await dataToBeDeleted.destroy();

        return {
            status: true,
            message: 'Country deleted successfully!',
        };
    } catch (error) {
        console.log(error.message);

        return {
            status: false,
            message: 'Error in deleting the country.',
        };
    }
}

module.exports = DeleteCountryService;
