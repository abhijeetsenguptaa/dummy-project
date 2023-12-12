const Wishlist = require("../../models/wishlist.model");

async function PostWishlistsService(userID, productID) {
    try {
        const postRecentSearches = await Wishlist.create({ user_id: userID, product_id: productID });
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

module.exports = PostWishlistsService;