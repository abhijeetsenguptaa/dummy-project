const express = require('express');
const { loggingUsingPhoneController, OtpVerificationController } = require('../controllers/user.controller');



const userRoute = express.Router();

userRoute.post('/phone-login', loggingUsingPhoneController);
userRoute.post('/verifying-otp', OtpVerificationController);

module.exports = userRoute;