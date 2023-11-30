const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');
const User = require('./user.model');
const Country = require('./country.model');
const State = require('./state.model');
const City = require('./city.model');

const Address = connection.define('addresses', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Country,
            key: 'id'
        },
        defaultValue: 0
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: State,
            key: 'id'
        },
        defaultValue: 0
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: City,
            key: 'id'
        },
        defaultValue: 0
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    default_shipping: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    default_billing: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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


Address.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Address.belongsTo(Country, {
    foreignKey: 'country_id',
    onDelete: 'CASCADE'
})

Address.belongsTo(State, {
    foreignKey: 'state_id',
    onDelete: 'CASCADE'
})

Address.belongsTo(City, {
    foreignKey: 'city_id',
    onDelete: 'CASCADE'
})

User.hasMany(Address, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Country.hasMany(Address, {
    foreignKey: 'country_id',
    onDelete: 'CASCADE'
})

State.hasMany(Address, {
    foreignKey: 'state_id',
    onDelete: 'CASCADE'
})

City.hasMany(Address, {
    foreignKey: 'city_id',
    onDelete: 'CASCADE'
})


module.exports = Address;