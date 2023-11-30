const Brand_Model = require("../../models/brand_model.model");


async function PostBrandModelService(name, slug, brand_id, status, logo, year, operatingSystem, displaySize, storageCapacity, ramSize, cameraResolution, batteryCapacity, simSlots, is5G, launchDate) {
    try {
        const brandModelCreation = await Brand_Model.create({name, slug, brand_id, status, logo, year, operatingSystem, displaySize, storageCapacity, ramSize, cameraResolution, batteryCapacity, simSlots, is5G, launchDate});
        
        return {
            status : true,
            message : 'New Brand Model added successfully',
            data : brandModelCreation
        }
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: 'Error in fetching brand models.',
        };
    }
}

module.exports = PostBrandModelService;