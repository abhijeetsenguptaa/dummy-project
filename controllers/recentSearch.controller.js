const FetchRecentSearchesService = require("../services/recent_searches/FetchRecentSearchesService");
const PostRecent_SearchesService = require("../services/recent_searches/PostRecentSearchesService");

async function postRecentSearchesController(req, res) {
    try {
        const userID = req.userID;
        const productID = req.params.id;

        const postRecentSearches = await PostRecent_SearchesService(userID, productID);

        return res.status(postRecentSearches.status ? 200 : 404).json({
            status: postRecentSearches.status,
            message: postRecentSearches.message,
            data: postRecentSearches.status ? postRecentSearches.data : null
        })
    } catch (error) {
        // Handling unexpected errors and logging them
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

async function fetchRecentSearchesController(req, res) {
    try {
        const userID = req.userID;

        const fetchRecentSearchesData = await FetchRecentSearchesService(userID);

        return res.status(fetchRecentSearchesData.status ? 200 : 404).json({
            status: fetchRecentSearchesData.status,
            message: fetchRecentSearchesData.message,
            count: fetchRecentSearchesData.count,
            data: fetchRecentSearchesData.status ? fetchRecentSearchesData.data : null
        })

    } catch (error) {
        // Handling unexpected errors and logging them
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


module.exports = { postRecentSearchesController, fetchRecentSearchesController };