const express = require('express');
const { loggingUsingPhoneController, OtpVerificationController, fetchUserDetailsController, upload, updatingUserDetailsController } = require('../controllers/user.controller');
const authentication = require('../middleware/authentication.middleware');



const userRoute = express.Router();

userRoute.post('/phone-login', loggingUsingPhoneController);
userRoute.post('/verifying-otp', OtpVerificationController);
userRoute.get('/', authentication, fetchUserDetailsController);
userRoute.post('/update', upload.single('image'), authentication, updatingUserDetailsController);

module.exports = userRoute;