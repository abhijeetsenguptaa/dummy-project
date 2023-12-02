const Vendors = require("../../models/vendor.model");

async function FetchVendorService() {
    try {
        const vendors = await Vendors.findAll();
        return {
            status: true,
            message: 'List of All the enrolled Vendor',
            count: vendors.length,
            data: vendors
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = FetchVendorService;