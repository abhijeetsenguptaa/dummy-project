const GetUserServiceAsPerUser = require("../services/users/GetUserService");
const MobileLoginService = require("../services/users/MobileLoginService");
const UpdateUserService = require("../services/users/UpdateUserService");
const OtpVerificationUtils = require("../utils/OtpVerificationUtils");
const multer = require('multer');


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/custom-images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});

async function loggingUsingPhoneController(req, res) {
    try {
        const { phone } = req.body;
        const loggingUser = await MobileLoginService(phone);

        return res.status(loggingUser.status ? 200 : 404).json({
            status: loggingUser.status,
            message: loggingUser.message,
            data: loggingUser.status ? loggingUser.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'An error occurred',
        });
    }
}

async function OtpVerificationController(req, res) {
    try {
        const { phone, otp } = req.body;
        const checkData = await OtpVerificationUtils(phone, otp);

        return res.status(checkData.status ? 200 : 404).json({
            status: checkData.status,
            message: checkData.message,
            token: checkData.status ? checkData.token : null,
            data: checkData.status ? checkData.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function fetchUserDetailsController(req, res) {
    try {
        const userID = req.userID;
        const userDetails = await GetUserServiceAsPerUser(userID);

        return res.status(userDetails.status ? 200 : 404).json({
            status: userDetails.status,
            msg: userDetails.msg,
            data: userDetails.data ? userDetails.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function updatingUserDetailsController(req, res) {
    try {
        const id = req.userID;
        const profilePicture = req.file;
        const profileFileName = req.file.filename;
        const { firstName, lastName, email, phone } = req.body;

        const updatedData = await UpdateUserService(id, firstName, lastName, email, phone, profilePicture, profileFileName);

        return res.status(updatedData.status ? 200 : 404).json({
            status: updatedData.status,
            message: updatedData.message,
            data: updatedData.status ? updatedData.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

module.exports = { upload, loggingUsingPhoneController, OtpVerificationController, fetchUserDetailsController, updatingUserDetailsController };