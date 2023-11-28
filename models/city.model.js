const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const State = require("./state.model");


const City = connection.define('cities', {
    country_state_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: State,
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
    }
}, {
    timestamps: false
})

City.belongsTo(State, {
    foreignKey: 'country_state_id',
    onDelete: 'CASCADE'
})
State.hasMany(City, {
    foreignKey: 'country_state_id',
    onDelete: 'CASCADE'
})


module.exports = City;