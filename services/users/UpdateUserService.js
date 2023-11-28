const User = require('../../models/user.model');
const { Op } = require('sequelize');
const fs = require('fs').promises;

async function UpdateUserService(id, firstName, lastName, email, phone, profilePicture, profileFileName) {
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return {
                status: false,
                message: 'User not found',
            };
        }

        // Delete the old image if a new file is uploaded
        if (profilePicture) {
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

            user.image = 'uploads/custom-images/' + profileFileName; // Save the path to the uploaded image
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
                return {
                    status: false,
                    message: 'Email already exists'
                };
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
                return {
                    status: false,
                    message: 'Phone Number is already in use.'
                };
            }
        }

        // Save the updated user
        await user.save();

        return {
            status: true,
            message: 'User updated successfully',
            data: user,
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: 'Internal server error',
        };
    }
}



module.exports = UpdateUserService;