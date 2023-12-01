const connection = require("../configs/connection");
const { DataTypes, literal } = require("sequelize");


const Otp_Verify = connection.define('otps_verify', {
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
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
    timestamps: false
})

module.exports = Otp_Verify;