const User = require("../../models/user.model");


async function GetUserServiceAsPerUser(userID) {
    try {
        const user = await User.findOne({ where: { id: userID } });
        return {
            status: true,
            msg: 'Your Profile Details',
            data: user,
        };
    } catch (error) {
        console.log(error);
        return {
            status: false,
            msg: 'Internal Server Error',
        };
    }
}


module.exports = GetUserServiceAsPerUser;