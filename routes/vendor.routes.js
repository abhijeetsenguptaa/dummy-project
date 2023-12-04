const express = require('express');
const { fetchVendorController } = require('../controllers/vendors.controller');
const vendorRoute = express.Router();

vendorRoute.get('/', fetchVendorController);

module.exports = vendorRoute;