const OtpVerify = require("../../models/otp_verify.model");
const generateNumericOTPUtils = require("../../utils/GenerateNumericOTPUtils");
const axios = require('axios');
const isValidPhoneNumber = require("../../utils/ValidatePhoneNumberUtil");

async function sendOTPviaSMS(mobileNumber, otpCode) {
    try {
        const apiUrl = `http://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=${mobileNumber}&msg=Please%20use%20OTP%20${otpCode}%20to%20verify%20your%20mobile%20number.%20MSAIIN.&msg_type=UNICODE_TEXT&userid=2000072868&auth_scheme=plain&password=z5p1KIBLL&v=1.1&format=text&principalEntityId=1001526103320756973&dltTemplateId=1007475346942570537&mask=MSAIIN`;

        // Make API call to send SMS
        const response = await axios.get(apiUrl);

        return response.status === 200;
    } catch (error) {
        console.error('Error sending OTP via SMS:', error);
        return false;
    }
}

async function MobileLoginService(phone) {
    try {
        if (!isValidPhoneNumber(phone)) {
            return {
                status: false,
                message: 'Invalid phone number. Please enter a 10-digit number.'

            }
        }

        const mobileNumber = '+91' + phone;
        const otpUser = await OtpVerify.findOne({ where: { phone: mobileNumber } });
        const otpCode = generateNumericOTPUtils(6);   // Generate a 6-digit OTP code

        // Function to create or update OTP record in the database
        async function saveOrUpdateOTP() {
            if (!otpUser) {
                const newOtpUser = await OtpVerify.create({ phone: mobileNumber, otp: otpCode, status: true });
                return newOtpUser;
            }

            otpUser.otp = otpCode;
            otpUser.status = true;
            await otpUser.save();
            return otpUser;
        }

        const updatedOtpUser = await saveOrUpdateOTP();

        // Send OTP via SMS
        const isOTPSent = await sendOTPviaSMS(mobileNumber, otpCode);

        if (isOTPSent) {
            return {
                status: true,
                message: 'OTP sent successfully',
                data: updatedOtpUser,
            };
        } else {
            return {
                status: false,
                message: 'Error sending OTP',
            };
        }
    } catch (error) {
        console.error('An error occurred in MobileLoginService:', error);
        return {
            status: false,
            message: 'An error occurred',
        };
    }
}

module.exports = MobileLoginService;
