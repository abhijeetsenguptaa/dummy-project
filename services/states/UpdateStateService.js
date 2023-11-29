const State = require("../../models/state.model");

async function UpdateStateService(id, name, slug, status) {
    try {
        const existingState = await State.findByPk(id);

        if (!existingState) {
            return {
                status: false,
                message: 'State not found for the provided ID.',
            };
        }

        // Update the country attributes
        existingState.name = name;
        existingState.slug = slug;
        existingState.status = status;

        // Save the changes to the database
        const updatedState = await existingState.save();

        return {
            status: true,
            message: 'State updated successfully!',
            data: updatedState,
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: 'Error in updating the state.',
        };
    }
}

module.exports = UpdateStateService;
