const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const User = require("./user.model");
const Product = require("./product.model");

const Wishlist = connection.define('wishlists', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Product,
            key: 'id'
        }
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
},
    {
        timestamps: false
    })


Wishlist.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Wishlist, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Wishlist.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
})

Product.hasMany(Wishlist, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
})

module.exports = Wishlist;