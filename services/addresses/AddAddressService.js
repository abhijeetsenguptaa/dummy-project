const Address = require("../../models/address.mode");

async function AddAddressService(userID, name, email, phone, country_id, state_id, city_id, address, type, default_shipping, default_billing) {
    try {
        if (!country_id || !state_id || !city_id || !address || !type || !default_shipping || !default_billing) {
            return res.status(400).json({
                status: false,
                message: 'Fill up all the fields!!'
            })
        }

        const newAddress = await Address.create({ user_id: userID, name, email, phone, country_id, state_id, city_id, address, type, default_shipping, default_billing })
        
        return {
            status: true,
            message: 'New address created successfully',
            data: newAddress
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: 'Internal Server Error'
        }
    }
}


module.exports = AddAddressService;