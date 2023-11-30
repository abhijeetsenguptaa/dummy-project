const Address = require("../../models/address.model");

async function DeleteAddressService(id){
    try {
        const address = await Address.findByPk(id);

        // Check if the address exists
        if (!address) {
            return {
                status: false,
                message: 'Address not found'
            };
        }

        // Perform the delete operation
        await address.destroy();

        return {
            status: true,
            message: 'Address deleted successfully'
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: 'Internal Server Error'
        };
    }
}


module.exports = DeleteAddressService;