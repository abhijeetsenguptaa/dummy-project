const Category = require("../../models/category.model");

async function HandleStatusService(id) {
    try {
        const statusHandler = await Category.findByPk(id);

        if (!statusHandler) {
            return {
                status: false,
                message: "Item not found!"
            };
        }

        statusHandler.status = !statusHandler.status;

        try {
            await statusHandler.save();
            return {
                status: true,
                message: "Status updated successfully."
            };
        } catch (saveError) {
            console.error("Error updating status:", saveError.message);
            return {
                status: false,
                message: "Failed to update status."
            };
        }
    } catch (error) {
        // Handling unexpected errors and logging them
        console.error("Unexpected error:", error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = HandleStatusService;
