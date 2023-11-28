const Otp_Verify = require("../models/otp_verify.model");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
async function OtpVerificationUtils(phone, otp) {
    try {
        const number = "+91" + phone
        const user = await Otp_Verify.findOne({ where: { phone: number } })
        const isUser = await User.findOne({ where: { phone: number } })
        if (user.phone == number && user.otp == otp) {
            if (!isUser) {
                const newUser = await User.create({ provider: 'mobile', status: true, phone: number })
                const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
                return {
                    status: true,
                    token: token,
                    data: newUser,
                    message: "OTP verified successfully"
                };
            } else {
                const token = jwt.sign({ id: isUser.id }, process.env.JWT_SECRET);
                return {
                    status: true,
                    token: token,
                    data: isUser,
                    message: "OTP verified successfully"
                };
            }
        } else {
            return {
                status: false,
                message: "Invalid OTP"
            };
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: "An error occurred in verifying the OTP."
        };
    }
}


module.exports = OtpVerificationUtils;