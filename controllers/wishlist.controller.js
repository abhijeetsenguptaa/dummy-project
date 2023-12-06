const FetchWishlistService = require("../services/wishlists/FetchWishlistService");
const PostWishlistService = require("../services/wishlists/PostWishlistService");

async function postWishlistController(req, res) {
    try {
        const userID = req.userID;
        const productID = req.params.id;

        const postWishlist = await PostWishlistService(userID, productID);

        return res.status(postWishlist.status ? 200 : 404).json({
            status: postWishlist.status,
            message: postWishlist.message,
            data: postWishlist.status ? postWishlist.data : null
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

async function fetchWishlistController(req, res) {
    try {
        const userID = req.userID;

        const fetchWishlistData = await FetchWishlistService(userID);
        
        return res.status(fetchWishlistData.status ? 200 : 404).json({
            status: fetchWishlistData.status,
            message: fetchWishlistData.message,
            data: fetchWishlistData.status ? fetchWishlistData.data : null
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


module.exports = { postWishlistController, fetchWishlistController };