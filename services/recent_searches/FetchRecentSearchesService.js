const Product = require("../../models/product.model");
const Recent_Searches = require("../../models/recentSearch.model");
const User = require("../../models/user.model");


async function FetchRecentSearchesService(userID) {
    try {
        console.log(userID);
        const fetchRecentSearchesData = await Recent_Searches.findAll({
            where: { user_id: userID }, include: [{ model: Product },
            { model: User }]
        });

        return {
            status: true,
            message: `Recent Searches data for ${userID}.`,
            data: fetchRecentSearchesData
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error.message,
        };
    }
}



module.exports = FetchRecentSearchesService;