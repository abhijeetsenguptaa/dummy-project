const Recent_Searches = require("../../models/recentSearch.model");


async function PostRecentSearchesService(userID, productID) {
    try {
        const postRecentSearches = await Recent_Searches.create({ user_id: userID, product_id: productID });
        return {
            status: true,
            message : 'Items has been added to RecentSearches.',
            data : postRecentSearches
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = PostRecentSearchesService;