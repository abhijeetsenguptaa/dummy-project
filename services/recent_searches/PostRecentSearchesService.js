const Recent_Searches = require("../../models/recentSearch.model");

async function PostRecent_SearchesService(userID, productID) {
    try {
        const existingSearch = await Recent_Searches.findOne({ where: { user_id: userID, product_id: productID } });

        if (existingSearch) {
            await existingSearch.destroy();
        }

        const postRecent_Searches = await Recent_Searches.create({ user_id: userID, product_id: productID });

        const totalData = await Recent_Searches.findAll({ where: { user_id: userID } })

        if (totalData.length >= 6) {
            await totalData[0].destroy();
        }


        return {
            status: true,
            message: 'Items have been added to Recent_Searches.',
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
