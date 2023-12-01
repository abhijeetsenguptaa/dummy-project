const connection = require("../configs/connection");
const Country = require("./country.model");
const { DataTypes, literal } = require("sequelize");


const State = connection.define('country_states', {
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Country,
            key: 'id'
        }
    },
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
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false
})

// Define the association between State and Country
State.belongsTo(Country, {
    foreignKey: 'country_id',
    onDelete: 'CASCADE', // Optional: Cascade delete records in the State table when a related Country is deleted
});

Country.hasMany(State, {
    foreignKey: 'country_id',
    onDelete: 'CASCADE', // Optional: Cascade delete related States when a Country is deleted
});



module.exports = State;