const Recent_Searches = require("../../models/recentSearch.model");

async function PostRecent_SearchesService(userID, productID) {
    try {
        // Check if the product is already available
        const existingSearch = await Recent_Searches.findOne({
            where: { user_id: userID, product_id: productID },
        });

        if (existingSearch) {
            // If product is already available, delete the existing entry
            await existingSearch.destroy();
        }

        const fetchRecentSearchData = await Recent_Searches.findAll({
            where: { user_id: userID },
            order: [['created_at', 'ASC']], // Assuming there's a createdAt field
        });

        if (fetchRecentSearchData.length === 5) {
            // Destroy the oldest entry
            await fetchRecentSearchData[0].destroy();
        }

        // Create a new entry
        const postRecent_Searches = await Recent_Searches.create({
            user_id: userID,
            product_id: productID,
        });

        return {
            status: true,
            message: fetchRecentSearchData.length >= 1 ? 'Items have been added to Recent_Searches.' : 'No Recent_Searches',
            data: postRecent_Searches,
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = PostRecent_SearchesService;
