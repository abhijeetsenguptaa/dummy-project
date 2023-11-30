const Brand = require("../../models/brand.model")

async function PostBrandService(name, slug, logo, status) {
    try {
        const brandPost = await Brand.create({ name, slug, logo, status });

        return {
            status: true,
            message: 'Brand added successfully',
            data : brandPost
        }
    } catch (error) {
        console.log(error.message)
        return {
            status: false,
            message: error.message
        }
    }
} 

module.exports = PostBrandService;