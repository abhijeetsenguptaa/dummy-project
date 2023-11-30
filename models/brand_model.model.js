const { DataTypes, literal } = require("sequelize");
const connection = require('../configs/connection');
const Brand = require('./brand.model');

const Brand_Model = connection.define('brand_models', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Brand,
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    operatingSystem: {
        type: DataTypes.ENUM('iOS', 'Android', 'Other'),
        allowNull: true,
        defaultValue: null,
    },
    displaySize: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null,
    },
    storageCapacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    ramSize: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    cameraResolution: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    batteryCapacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    simSlots: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    is5G: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    launchDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
}, {
    timestamps: false,
});

Brand_Model.belongsTo(Brand, {
    foreignKey: 'brand_id',
    onDelete: 'CASCADE',
});

Brand.hasMany(Brand_Model, {
    foreignKey: 'brand_id',
    onDelete: 'CASCADE',
});

module.exports = Brand_Model;
