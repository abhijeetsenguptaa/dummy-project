const Shopping_Carts = require("../../models/shopping_cart.model");

async function UpdateShoppingItemService(userID, id, qty, coupon_name, coupon_price, offer_type) {
    try {
        // Find the shopping cart item to update
        const updatingShoppingCartItem = await Shopping_Carts.findOne({ where: { user_id: userID, id: id } });

        // If the shopping cart item is not found, return an error
        if (!updatingShoppingCartItem) {
            return {
                status: false,
                message: 'Shopping item not found.',
            };
        }

        // If the shopping cart item is found, update its properties
        updatingShoppingCartItem.qty = qty;
        updatingShoppingCartItem.coupon_name = coupon_name;
        updatingShoppingCartItem.coupon_price = coupon_price;
        updatingShoppingCartItem.offer_type = offer_type;

        // Save the changes to the database
        await updatingShoppingCartItem.save();

        return {
            status: true,
            message: 'Shopping item updated successfully.',
            data: updatingShoppingCartItem,
        };

    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: 'Failed to update shopping item.',
            error: error.message,
        };
    }
}




module.exports = UpdateShoppingItemService;