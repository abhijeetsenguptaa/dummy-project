const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');


const Category = connection.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    sorting_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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


module.exports = Category;