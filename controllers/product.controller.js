const Product = require("../models/product.model");
const FetchOneProductService = require("../services/products/FetchOneProductService");
const FetchProductService = require("../services/products/FetchProductService");
// const PostProductService = require("../services/products/PostProductService");
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/product-images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});


async function fetchProductController(req, res) {
    try {
        const { id, brand, model, category, low, high, product_condition, page = 1, limit = 10, highlight, sort } = req.query;

        const productsData = await FetchProductService(id, brand, model, category, low, high, product_condition, page, limit, highlight, sort);

        return res.status(productsData.status ? 200 : 404).json({
            status: productsData.status,
            message: productsData.message,
            totalCount: productsData.status ? productsData.totalCount : 0,
            data: productsData.status ? productsData.data : null
        })
    } catch (error) {
        // Handling unexpected errors and logging them
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}



async function postProductController(req, res) {
    try {
        let images;

        if (req.file) {
            // Access uploaded images in req.files
            images = req.files.map((file) => ({
                filename: file.originalname
            }));
        }

        const { name,
            short_name,
            slug,
            thumb_image,
            vendor_id,
            category_id,
            brand_id,
            qty,
            weight,
            sold_qty,
            short_description,
            long_description,
            video_link,
            sku, imei,
            seo_title,
            seo_description,
            price,
            offer_price,
            tags,
            show_homepage,
            is_undefine,
            is_featured,
            new_product,
            is_top,
            is_best,
            status,
            is_specification,
            is_refurbished,
            is_condition,
            brand_model_id,
            battery_condition,
            product_condition,
            os,
            processor,
            ram,
            storage_capacity,
            display_size,
            resolution,
            front_camera,
            rear_camera,
            connectivity,
            sim_type,
            network_technology,
            approve_by_admin } = req.body;

        const postingProduct = await Product.create({
            name,
            short_name,
            slug,
            thumb_image,
            vendor_id,
            category_id,
            brand_id,
            qty,
            weight,
            sold_qty,
            short_description,
            long_description,
            video_link,
            sku, imei,
            seo_title,
            seo_description,
            price,
            offer_price,
            tags,
            show_homepage,
            is_undefine,
            is_featured,
            new_product,
            is_top,
            is_best,
            status,
            is_specification,
            is_refurbished,
            is_condition,
            brand_model_id,
            battery_condition,
            product_condition,
            os,
            processor,
            ram,
            storage_capacity,
            display_size,
            resolution,
            front_camera,
            rear_camera,
            connectivity,
            sim_type,
            network_technology,
            images,
            approve_by_admin
        })

        // return res.status(postingProduct.status ? 200 : 404).json({
        //     status: postingProduct.status,
        //     message: postingProduct.message,
        //     data: postingProduct.status ? postingProduct.data : null
        // })
        return res.status(200).json({
            status: true,
            message: "Successfully Uploaded",
            data: postingProduct
        })
    } catch (error) {
        // Handling unexpected errors and logging them
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}


async function fetchOneProductController(req, res) {
    try {
        const id = req.params.id;

        const fetchedOneData = await FetchOneProductService(id);

        return res.status(fetchedOneData.status ? 200 : 404).json({
            status: fetchedOneData.status,
            message: fetchedOneData.message,
            data: fetchedOneData.status ? fetchedOneData.data : null,
            productFromOtherSeller: fetchedOneData.status ? fetchedOneData.dataFromOtherSeller : null,
            similarPhones: fetchedOneData.status ? fetchedOneData.similarPhones : null
        })
    } catch (error) {
        // Handling unexpected errors and logging them
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}
module.exports = { fetchProductController, postProductController, fetchOneProductController, upload };