const Wishlist = require("../../models/wishlist.model");

async function DeleteWishlistService(id, userID) {
    try {
        const dataToBeDeleted = await Wishlist.findAll({
            where: {
                product_id: id,
                user_id: userID
            }
        });

        if (!dataToBeDeleted || dataToBeDeleted.length === 0) {
            return {
                status: false,
                message: 'Wishlist item not found.',
            };
        }

        // Assuming you want to delete all found items
        await Promise.all(dataToBeDeleted.map(item => item.destroy()));

        return {
            status: true,
            message: 'Wishlist items deleted successfully.',
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
