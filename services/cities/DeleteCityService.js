const City = require("../../models/city.model");

async function DeleteCityService(id) {
    try {
        if (!id) {
            return {
                status: false,
                message: 'ID is required for deletion.',
            };
        }

        const dataToBeDeleted = await City.findByPk(id);

        if (!dataToBeDeleted) {
            return {
                status: false,
                message: 'City not found for the provided ID.',
            };
        }

        await dataToBeDeleted.destroy();

        return {
            status: true,
            message: 'City deleted successfully!',
        };
    } catch (error) {
        console.log(error.message);

        return {
            status: false,
            message: 'Error in deleting the city.',
        };
    }
}

module.exports = DeleteCityService;
