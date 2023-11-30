const { Op } = require("sequelize");
const Address = require("../../models/address.model");
const Country = require("../../models/country.model");
const State = require("../../models/state.model");
const City = require("../../models/city.model");



async function FetchAddressService(id,userID) {
    try {
        if (id) {
            const addresses = await Address.findAll({
                where: {
                    [Op.and]: [
                        { id }, // Match the specified id
                        { user_id: userID }, // Match the user_id
                    ],
                },
                include: [
                    {
                        model: Country,
                        attributes: ['name'], // Include the 'name' attribute of the Country model
                    },
                    {
                        model: State,
                        attributes: ['name'], // Include the 'name' attribute of the State model
                    },
                    {
                        model: City,
                        attributes: ['name'], // Include the 'name' attribute of the City model
                    },
                ],
            });

            return {
                status: true,
                count: addresses.length,
                message: 'Your Saved Addresses',
                data: addresses,
            };
        }

        const addresses = await Address.findAll({
            where: { user_id: userID },
            include: [
                {
                    model: Country,
                    attributes: ['name'], // Include the 'name' attribute of the Country model
                },
                {
                    model: State,
                    attributes: ['name'], // Include the 'name' attribute of the State model
                },
                {
                    model: City,
                    attributes: ['name'], // Include the 'name' attribute of the City model
                },
            ]
        });

        return {
            status: true,
            count: addresses.length,
            message: 'Your Saved Addresses',
            data: addresses
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: 'Internal Server Error',
        };
    }
}



module.exports = FetchAddressService;