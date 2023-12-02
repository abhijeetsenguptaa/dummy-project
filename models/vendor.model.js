const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const User = require("./user.model");

const Vendors = connection.define('vendors', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    total_amount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0
    },
    banner_image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    shop_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    open_at: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    closed_at: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    flat: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    seo_title: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    seo_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    is_featured: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    top_rated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    verified_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    aadhar_no: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pan_no: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gst_no: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    aadhar_pdf: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pan_pdf: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cancel_checkpdf: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    kyc_complete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    greeting_msg: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
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
    timestamps: false,
})

Vendors.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Vendors, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

module.exports = Vendors;