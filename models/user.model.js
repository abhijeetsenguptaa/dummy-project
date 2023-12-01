const connection = require("../configs/connection");
const City = require("./city.model");
const Country = require("./country.model");
const State = require("./state.model");
const { DataTypes, literal } = require("sequelize");

const User = connection.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    remember_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    forget_password_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    provider_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: true
    },
    provider_avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Country,
            key: 'id'
        }
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: State,
            key: 'id'
        }
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: City,
            key: 'id'
        }
    },
    zip_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_vendor: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    verify_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    agree_policy: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
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



module.exports = User;