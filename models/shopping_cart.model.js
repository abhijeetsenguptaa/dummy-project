const { DataTypes } = require('sequelize');
const  connection  = require('../configs/connection');
const User = require('./user.model');
const Product = require('./product.model');


const Shopping_Carts = connection.define('shopping_carts',{
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
    qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    coupon_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    coupon_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null
    },
    offer_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
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
    timestamps: false,
})

Shopping_Carts.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Shopping_Carts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Shopping_Carts.belongsTo(Product,{
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
})

Product.hasMany(Shopping_Carts, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
})



module.exports =  Shopping_Carts ;