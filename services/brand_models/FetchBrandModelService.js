const BrandModel = require("../../models/brand_model.model");
const Brand = require("../../models/brand.model");  // Import the Brand model

async function FetchBrandModelService(id, status) {
    try {
        let fetchBrandModelData;

        const queryOptions = {};
        queryOptions.include = [Brand];  // Include the Brand model
        if (id) {
            queryOptions.where = { id: id };
            fetchBrandModelData = await BrandModel.findOne(queryOptions);
        } else if (status !== undefined) {
            queryOptions.where = { status: status };
            fetchBrandModelData = await BrandModel.findAll(queryOptions);
        } else {
            fetchBrandModelData = await BrandModel.findAll(queryOptions);
        }

        return {
            status: true,
            count: fetchBrandModelData.length,
            data: fetchBrandModelData,
            message: 'Brand models fetched successfully.',
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: 'Error in fetching brand models.',
        };
    }
}

module.exports = FetchBrandModelService;
