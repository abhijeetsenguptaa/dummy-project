const express = require("express");
const { addingAddressController, fetchingAddressController, updateAddressController, deleteAddressController } = require("../controllers/address.controller");
const authentication = require("../middleware/authentication.middleware");

const addressRoute = express.Router();


addressRoute.get('/', authentication, fetchingAddressController);
addressRoute.post('/', authentication, addingAddressController);
addressRoute.patch('/:id', authentication, updateAddressController);
addressRoute.delete('/:id', authentication, deleteAddressController);


module.exports = addressRoute;