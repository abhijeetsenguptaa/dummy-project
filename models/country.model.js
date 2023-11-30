const connection = require("../configs/connection");
const { DataTypes, literal } = require("sequelize");


const Country = connection.define('countries', {
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
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
    timestamps: false
})


module.exports = Country;