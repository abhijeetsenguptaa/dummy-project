const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');
const Category = require('./category.model');
const Vendors = require('./vendor.model');
const Brand = require('./brand.model');
const Brand_Model = require('./brand_model.model');


const Product = connection.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    short_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    thumb_image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: Vendors,
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: Category,
            key: 'id'
        }
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: Brand,
            key: 'id'
        }
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    sold_qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    short_description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    long_description: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
        defaultValue: null
    },
    video_link: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    imei: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    seo_title: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    seo_description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null
    },
    offer_price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null
    },
    tags: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    show_homepage: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    is_undefine: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    is_featured: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    new_product: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    is_top: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    is_best: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    is_specification: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    is_refurbished: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    is_condition: {
        type: DataTypes.ENUM('new', 'old', 'certified'),
        allowNull: true
    },
    brand_model_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Brand_Model,
            key: 'id'
        }

    },
    battery_condition: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    product_condition: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    os: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    processor: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    ram: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    storage_capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    display_size: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    resolution: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    front_camera: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    rear_camera: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    connectivity: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    sim_type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    network_technology: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null
    },    
    approve_by_admin: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false
})


Product.belongsTo(Category, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
})
Product.belongsTo(Vendors, {
    foreignKey: 'vendor_id',
    onDelete: 'CASCADE'
})

Product.belongsTo(Brand , {
    foreignKey : 'brand_id',
    onDelete : 'CASCADE'
})

Product.belongsTo(Brand_Model , {
    foreignKey : 'brand_model_id',
    onDelete : 'CASCADE'
})

Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
})

Vendors.hasMany(Product, {
    foreignKey: 'vendor_id',
    onDelete: 'CASCADE'
})

Brand.hasMany(Product, {
    foreignKey: 'brand_id',
    onDelete: 'CASCADE'
})

Brand_Model.hasMany(Product, {
    foreignKey: 'brand_model_id',
    onDelete: 'CASCADE'
})

module.exports = Product;
