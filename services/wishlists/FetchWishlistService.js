const Product = require("../../models/product.model");
const User = require("../../models/user.model");
const Wishlist = require("../../models/wishlist.model");

async function FetchWishlistService(userID) {
    try {
        const fetchWishlistData = await Wishlist.findAll({
            where: { user_id: userID }, include: [
                { model: Product }, { model: User }]
        });

        return {
            status: true,
            message: `Wishlist data for ${userID}.`,
            data: fetchWishlistData
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error.message,
        };
    }
}



module.exports = FetchWishlistService;