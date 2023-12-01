const { DataTypes, literal } = require("sequelize");
const connection = require('../configs/connection');


const Brand = connection.define('brands', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
}, {
    timestamps: false,
})



module.exports = Brand;