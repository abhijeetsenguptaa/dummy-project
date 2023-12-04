const Product = require("../../models/product.model");
async function PostProductService(name, short_name, slug, thumb_image, vendor_id, category_id, brand_id, qty, weight, sold_qty, short_description, long_description, video_link, sku, imei, seo_title, seo_description, price, offer_price, tags, show_homepage, is_undefine, is_featured, new_product, is_top, is_best, status, is_specification, is_refurbished, is_condition, brand_model_id, battery_condition, product_condition, approve_by_admin) {
    try {
        const postProductItem = await Product.create({ name, short_name, slug, thumb_image, vendor_id, category_id, brand_id, qty, weight, sold_qty, short_description, long_description, video_link, sku, imei, seo_title, seo_description, price, offer_price, tags, show_homepage, is_undefine, is_featured, new_product, is_top, is_best, status, is_specification, is_refurbished, is_condition, brand_model_id, battery_condition, product_condition, approve_by_admin })

        return {
            status: true,
            message: 'Item has been added successfully.',
            data: postProductItem
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: error.message,
        };
    }
}



module.exports = PostProductService;