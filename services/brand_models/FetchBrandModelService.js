const Brand = require('../../models/brand.model');
const BrandModel = require('../../models/brand_model.model');

async function FetchBrandModelService(id, brandID, status) {
    try {
        let fetchBrandModelData;

        const queryOptions = { include: [Brand] };
        const whereClause = {};

        if (id) {
            whereClause.id = id;
        }
        if (brandID) {
            whereClause.brand_id = brandID;
        }
        if (status !== undefined) {
            whereClause.status = status;
        }

        queryOptions.where = whereClause;
        fetchBrandModelData = await BrandModel.findAll(queryOptions);

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
