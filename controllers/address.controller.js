const AddAddressService = require("../services/addresses/AddAddressService");
const DeleteAddressService = require("../services/addresses/DeleteAddressService");
const FetchAddressService = require("../services/addresses/FetchAddressService");
const UpdateAddressService = require("../services/addresses/UpdateAddressService");

async function fetchingAddressController(req, res) {
    try {
        const { id } = req.query;
        const userID = req.userID;

        const fetchAddress = await FetchAddressService(id, userID);

        return res.status(fetchAddress.status ? 200 : 500).json({
            status: fetchAddress.status,
            count: fetchAddress.status ? fetchAddress.count : 0,
            message: fetchAddress.message,
            data: fetchAddress.status ? fetchAddress.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            msg: 'Internal Server Error',
        });
    }
}


async function addingAddressController(req, res) {
    try {
        const userID = req.userID;
        const { name, email, phone, country_id, state_id, city_id, address, pincode, type, default_shipping, default_billing } = req.body;

        const addressInsert = await AddAddressService(userID, name, email, phone, country_id, state_id, city_id, address, pincode, type, default_shipping, default_billing);

        return res.status(addressInsert.status ? 200 : 500).json({
            status: addressInsert.status,
            message: addressInsert.message,
            data: addressInsert.status ? addressInsert.data : null
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            msg: 'Internal Server Error'
        })
    }
}

async function updateAddressController(req, res) {
    try {
        const id = req.params.id;
        const { name, email, phone, country_id, state_id, city_id, address,pincode, type, default_shipping, default_billing } = req.body;

        const addressUpgrade = await UpdateAddressService(id, name, email, phone, country_id, state_id, city_id, address,pincode, type, default_shipping, default_billing);

        return res.status(addressUpgrade.status ? 200 : 404).json({
            status: addressUpgrade.status,
            message: addressUpgrade.message
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        })
    }
}

async function deleteAddressController(req, res) {
    try {
        const id = req.params.id;
        const deleteAddress = await DeleteAddressService(id);


        return res.status(deleteAddress.status ? 200 : 404).json({
            status: deleteAddress.status,
            message: deleteAddress.message
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        });
    }
}

module.exports = { fetchingAddressController, addingAddressController, updateAddressController, deleteAddressController };