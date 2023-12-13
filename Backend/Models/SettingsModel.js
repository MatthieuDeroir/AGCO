const {Model, DataTypes} = require('sequelize');
const sequelize = require('../Database/Sequelize'); // Adjust the path

class Settings extends Model {
}

Settings.init({
    debutVeille: DataTypes.STRING,
    finVeille: DataTypes.STRING,
    dureeDefilement: {
        type: DataTypes.INTEGER,
        defaultValue: 30
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {sequelize, modelName: 'settings'});

module.exports = Settings;
