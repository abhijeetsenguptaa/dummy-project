const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const User = require("./user.model");
const Product = require("./product.model");

const Recent_Searches = connection.define('recent_searches', {
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

Recent_Searches.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Recent_Searches, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Recent_Searches.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
})

Product.hasMany(Recent_Searches, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
})


module.exports = Recent_Searches;