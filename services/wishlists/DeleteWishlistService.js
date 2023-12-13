const Wishlist = require("../../models/wishlist.model");

async function DeleteWishlistService(id, userID) {
    try {
        const dataToBeDeleted = await Wishlist.findAll({
            where: {
                product_id: id,
                user_id: userID
            }
        });

        if (!dataToBeDeleted) {
            return {
                status: false,
                message: 'Wishlist item not found.',
            };
        }

        // Assuming you want to delete the found item
        await dataToBeDeleted.destroy();

        return {
            status: true,
            message: 'Wishlist item deleted successfully.',
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = DeleteWishlistService;
