const FetchVendorService = require("../services/vendors/FetchVendorService");

async function fetchVendorController(req,res){
    try {
        const vendorsData = await FetchVendorService();

        return res.status(vendorsData.status ? 200 :404).json({
            status: vendorsData.status  ,
            message: vendorsData.message,
            count: vendorsData.status ? vendorsData.count : 0,
            data: vendorsData.status ? vendorsData.data : null
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

module.exports = {fetchVendorController};