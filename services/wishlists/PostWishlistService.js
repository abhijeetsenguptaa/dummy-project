const Wishlist = require("../../models/wishlist.model");

async function PostWishlistService(userID, productID) {
    try {
        const postWishlist = await Wishlist.create({ user_id: userID, product_id: productID });
        return {
            status: true,
            message : 'Items has been added to Wishlist.',
            data : postWishlist
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = PostWishlistService;