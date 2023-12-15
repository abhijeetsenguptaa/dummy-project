const Shopping_Carts = require("../../models/shopping_cart.model");

async function FetchShoppingItemService(userID) {
    try {
        const shoppingItems = await Shopping_Carts.findAll({ where: { user_id: userID } });

        return {
            status: true,
            message: shoppingItems.length >= 1 ? "Items in the cart" : "No items in the cart",
            data: shoppingItems,
            count: shoppingItems.length
        }
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: 'Failed to add shopping item.',
            error: error.message
        };
    }
}

module.exports = FetchShoppingItemService;