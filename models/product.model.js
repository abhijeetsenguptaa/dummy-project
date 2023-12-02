const { DataTypes } = require('sequelize');
const Vendors = require('./vendors.model');
const connection = require('../configs/connection');
const Category = require('./category.model');


const Product = connection.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: null
    },
    short_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: null
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: null
    },
    thumb_image: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: false,
        defaultValue: 0,
        references: {
            model: Category,
            key: 'id'
        }
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        references: {
            model: 'brands',
            key: 'id'
        }
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false,
        defaultValue: null
    },
    long_description: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
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
        allowNull: false,
        defaultValue: null
    },
    seo_description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: null
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
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
        allowNull: false,
        defaultValue: false
    },
    is_undefine: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    is_featured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    new_product: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    is_top: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    is_best: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    is_specification: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
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
    approve_by_admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
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

Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
})

Vendors.hasMany(Product, {
    foreignKey: 'vendor_id',
    onDelete: 'CASCADE'
})

module.exports = Product;
