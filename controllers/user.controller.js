const MobileLoginService = require("../services/users/MobileLoginService");
const OtpVerificationUtils = require("../utils/OtpVerificationUtils");

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

module.exports = { loggingUsingPhoneController, OtpVerificationController };