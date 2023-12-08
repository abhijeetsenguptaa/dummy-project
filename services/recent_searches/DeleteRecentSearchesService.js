const Recent_Searches = require("../../models/recentSearch.model");

async function DeleteRecentSearchesService(userID, id) {
    try {
        // Find the recent search by ID and user ID
        const recentSearch = await Recent_Searches.findOne({ where: { id: id, user_id: userID } });

        // Check if the recent search exists
        if (!recentSearch) {
            return {
                status: false,
                message: "Recent search not found.",
            };
        }

        // Delete the recent search
        await recentSearch.destroy();

        return {
            status: true,
            message: "Recent search deleted successfully.",
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = DeleteRecentSearchesService;
