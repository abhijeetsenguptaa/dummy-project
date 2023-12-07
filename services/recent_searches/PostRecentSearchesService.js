const Recent_Searches = require("../../models/recentSearch.model");

async function PostRecent_SearchesService(userID, productID) {
    try {
        const postRecent_Searches = await Recent_Searches.create({ user_id: userID, product_id: productID });
        return {
            status: true,
            message : 'Items has been added to Recent_Searches.',
            data : postRecent_Searches
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = PostRecent_SearchesService;