const Shopping_Carts = require("../../models/shopping_cart.model");

async function DeleteCartService(id) {
    try {
        // Find the shopping cart item by its primary key (id)
        const cartItem = await Shopping_Carts.findByPk(id);

        if (!cartItem) {
            return {
                status: false,
                message: 'Shopping item not found.',
            };
        }

        // Delete the shopping cart item
        await cartItem.destroy();

        return {
            status: true,
            message: 'Shopping item deleted successfully.',
            data : await Shopping_Carts.findAll()
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: 'Failed to delete shopping item.',
            error: error.message,
        };
    }
}

module.exports = DeleteCartService;
