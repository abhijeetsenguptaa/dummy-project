const Product = require("../../models/product.model");
const Shopping_Carts = require("../../models/shopping_cart.model");

async function PostShoppingItemService(user_id, product_id, qty, coupon_name, coupon_price, offer_type) {
    try {
        const itemInProducts = await Product.findOne({ where: { id: product_id } });
        if (!itemInProducts) {
            return {
                status: false,
                message: 'Product is not available.'
            };
        }
        // Check if the item is already in the cart
        const itemAlreadyInCart = await Shopping_Carts.findOne({ where: { user_id, product_id } });

        if (itemAlreadyInCart) {
            return {
                status: false,
                message: 'Item is already in the cart.'
            };
        }

        // Create the shopping item
        const shoppingItem = await Shopping_Carts.create({ user_id, product_id, qty, coupon_name, coupon_price, offer_type });

        return {
            status: true,
            message: 'Shopping item added successfully.',
            data: shoppingItem
        };

    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: 'Failed to add shopping item.',
            error: error.message
        };
    }
}

module.exports = PostShoppingItemService;
