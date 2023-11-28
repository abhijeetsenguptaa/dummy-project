const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");

const Banner_Image = connection.define({
    header: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    banner_location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    after_product_qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    title_one: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title_two: {
        type: DataTypes.STRING,
        allowNull: true
    },
    badge: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_slug: {
        type: DataTypes.STRING,
        allowNull: true
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


module.exports = Banner_Image;