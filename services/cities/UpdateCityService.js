const City = require("../../models/city.model");

async function UpdateCityService(id, name, slug, status) {
    try {
        const existingCity = await City.findByPk(id);

        if (!existingCity) {
            return {
                status: false,
                message: 'City not found for the provided ID.',
            };
        }

        // Update the country attributes
        existingCity.name = name;
        existingCity.slug = slug;
        existingCity.status = status;

        // Save the changes to the database
        const updatedCity = await existingCity.save();

        return {
            status: true,
            message: 'City updated successfully!',
            data: updatedCity,
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: 'Error in updating the city.',
        };
    }
}

module.exports = UpdateCityService;
