const Brand_Model = require("../models/brand_model.model");
const FetchBrandModelService = require("../services/brand_models/FetchBrandModelService");
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/brand-model-images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});

async function postBrandModelController(req, res) {
    try {
        let logo;
        const { name, slug, brand_id, status, year, operatingSystem, displaySize, storageCapacity, ramSize, cameraResolution, batteryCapacity, simSlots, is5G, launchDate } = req.body;

        if (req.file) {
            logo = 'uploads/brand-model-images/' + req.file.filename;
        }
        const brandModelCreation = await Brand_Model.create({ name, slug, brand_id, status, logo, year, operatingSystem, displaySize, storageCapacity, ramSize, cameraResolution, batteryCapacity, simSlots, is5G, launchDate });

        return {
            status: true,
            message: 'New Brand Model added successfully',
            data: brandModelCreation
        }
    } catch (error) {
        // Handling unexpected errors and logging them
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

async function fetchBrandModelController(req, res) {
    try {
        const { id, brandID, status } = req.query;

        const fetchedModelData = await FetchBrandModelService(id, brandID, status);

        return res.status(fetchedModelData.status ? 200 : 404).json({
            status: fetchedModelData.status,
            count: fetchedModelData.count,
            data: fetchedModelData.data,
            message: fetchedModelData.message
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


module.exports = { upload, fetchBrandModelController, postBrandModelController }