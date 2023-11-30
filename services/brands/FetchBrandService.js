const Brand = require("../../models/brand.model");

async function FetchBrandService(id) {
    try {
        if (id) {
            const brand = await Brand.findOne({ where: { id } })
            return {
                status: true,
                count: brand.length,
                message: brand,
            };
        }
        const brands = await Brand.findAll();
        const brandCount = await Brand.count(); // Count the total number of brands

        return {
            status: true,
            count: brandCount, // Include the count in the response
            message: brands,
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message,
        };
    }
}


module.exports = FetchBrandService;