const User = require("../models/user.model");
const GetUserServiceAsPerUser = require("../services/users/GetUserService");
const MobileLoginService = require("../services/users/MobileLoginService");
// const UpdateUserService = require("../services/users/UpdateUserService");
const OtpVerificationUtils = require("../utils/OtpVerificationUtils");
const multer = require('multer');
const { Op } = require('sequelize');
const fs = require('fs').promises;

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
    // try {
    //     const id = req.userID;
    //     const profilePicture = req.file;
    //     const profileFileName = req.file.filename;
    //     const { firstName, lastName, email, phone } = req.body;

    //     const updatedData = await UpdateUserService(id, firstName, lastName, email, phone, profilePicture, profileFileName);

    //     return res.status(updatedData.status ? 200 : 404).json({
    //         status: updatedData.status,
    //         message: updatedData.message,
    //         data: updatedData.status ? updatedData.data : null
    //     })
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({
    //         status: false,
    //         message: 'Internal Server Error',
    //     });
    // }
    try {
        const id = req.userID;
        const { firstName, lastName, email, phone } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: false,
                msg: 'User not found',
            });
        }

        // Delete the old image if a new file is uploaded
        if (req.file) {
            // Remove the old image file if it exists
            if (user.image) {
                // Check if the file exists before unlinking
                try {
                    await fs.unlink(user.image);
                } catch (err) {
                    // Handle the error, e.g., log it
                    console.error(`Error unlinking file: ${err.message}`);
                }
            }

            user.image = 'uploads/custom-images/' + req.file.filename; // Save the path to the uploaded image
        }

        // Update user data if values are provided
        if (firstName) {
            user.name = firstName + ' ' + (lastName || ''); // Update only if firstName exists
        }
        if (email) {
            const existingUser = await User.findOne({ where: { email } });
            if (!existingUser || existingUser.id === id) {
                user.email = email; // Update only if email doesn't already exist for another user
            } else {
                return res.status(409).json({
                    status: false,
                    message: 'Email already exists'
                });
            }
        }
        if (phone) {
            const phoneWithCountryCode = '+91' + phone; // Construct the phone number with country code

            // Search for an existing user where the phone number matches with or without the country code
            const isMobileAvailable = await User.findOne({
                where: {
                    [Op.or]: [
                        { phone: phoneWithCountryCode },
                        { phone },
                    ],
                },
            });
            if (!isMobileAvailable) {
                user.phone = '+91' + phone; // Update only if phone exists
            } else {
                return res.status(409).json({
                    status: false,
                    message: 'Phone Number is already in use.'
                });
            }
        }

        // Save the updated user
        await user.save();

        return res.status(200).json({
            status: true,
            msg: 'User updated successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            msg: 'Internal server error',
        });
    }
}

module.exports = { upload, loggingUsingPhoneController, OtpVerificationController, fetchUserDetailsController, updatingUserDetailsController };