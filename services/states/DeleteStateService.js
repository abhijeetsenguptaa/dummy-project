const State = require("../../models/state.model");

async function DeleteStateService(id) {
    try {
        if (!id) {
            return {
                status: false,
                message: 'ID is required for deletion.',
            };
        }

        const dataToBeDeleted = await State.findByPk(id);

        if (!dataToBeDeleted) {
            return {
                status: false,
                message: 'State not found for the provided ID.',
            };
        }

        await dataToBeDeleted.destroy();

        return {
            status: true,
            message: 'State deleted successfully!',
        };
    } catch (error) {
        console.log(error.message);

        return {
            status: false,
            message: 'Error in deleting the state.',
        };
    }
}

module.exports = DeleteStateService;
