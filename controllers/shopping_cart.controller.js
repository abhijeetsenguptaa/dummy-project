const DeleteCartService = require("../services/carts/DeleteCartService");
const FetchShoppingItemService = require("../services/carts/FetchCartService");
const PostShoppingItemService = require("../services/carts/PostCartService");
const UpdateShoppingItemService = require("../services/carts/UpdateCartService");

async function postingShoppingCartController(req, res) {
    try {
        const productID = req.params.id;
        const userID = req.userID;

        const { qty, coupon_name, coupon_price, offer_type } = req.body;

        const shoppingItem = await PostShoppingItemService(userID, productID, qty, coupon_name, coupon_price, offer_type);

        return res.status(shoppingItem.status ? 200 : 404).json({
            status: shoppingItem.status,
            message: shoppingItem.message,
            data: shoppingItem.status ? shoppingItem.data : null
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

async function fetchingShoppingCartController(req, res) {
    try {
        const userID = req.userID;

        const itemsInTheCart = await FetchShoppingItemService(userID);

        return res.status(itemsInTheCart.status ? 200 : 404).json({
            status: itemsInTheCart.status,
            message: itemsInTheCart.message,
            data: itemsInTheCart.status ? itemsInTheCart.data : null,
            count: itemsInTheCart.status ? itemsInTheCart.count : 0
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

async function updatingShoppingCartController(req, res) {
    try {
        const userID = req.userID;
        const id = req.params.id;
        const { qty, coupon_name, coupon_price, offer_type } = req.body;

        const updatingItemsUsingID = await UpdateShoppingItemService(userID, id, qty, coupon_name, coupon_price, offer_type);

        return res.status(updatingItemsUsingID.status ? 200 : 404).json({
            status: updatingItemsUsingID.status,
            message: updatingItemsUsingID.message,
            data: updatingItemsUsingID.status ? updatingItemsUsingID.data : null
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


async function deleteShoppingCartController(req, res) {
    try {
        const id = req.params.id;

        const deleteItemController = await DeleteCartService(id);

        return res.status(deleteItemController ? 200 : 404).json({
            status: deleteItemController.status,
            message: deleteItemController.message,
            data: deleteItemController.status ? deleteItemController.data : null
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

module.exports = { postingShoppingCartController, fetchingShoppingCartController, updatingShoppingCartController, deleteShoppingCartController };