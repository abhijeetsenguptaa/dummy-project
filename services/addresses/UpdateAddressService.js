const Address = require("../../models/address.mode");

async function UpdateAddressService(id, name, email, phone, country_id, state_id, city_id, address, type, default_shipping, default_billing) {
    try {
        const required_address = await Address.findByPk(id);
        if (!required_address) {
            return {
                status: false,
                message: 'Address not found'
            }
        };

        required_address.name = name || required_address.name
        required_address.email = email || required_address.email
        required_address.address = address || required_address.address
        required_address.type = type || required_address.type
        required_address.phone = phone || required_address.phone
        required_address.country_id = country_id || required_address.country_id
        required_address.state_id = state_id || required_address.state_id
        required_address.city_id = city_id || required_address.city_id
        required_address.default_billing = default_billing || required_address.default_billing
        required_address.default_shipping = default_shipping || required_address.default_shipping

        await required_address.save()
        return {
            status: true,
            message: 'Address Updated successfully'
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: 'Internal Server Error'
        }
    }
}

module.exports = UpdateAddressService;