const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/Sequelize'); // Adjust the path

class Camion extends Model {}

Camion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    transporteur: DataTypes.STRING,
    immatriculation: DataTypes.STRING,
    quai: DataTypes.INTEGER,
    date_appel: DataTypes.DATE
}, { sequelize, modelName: 'camion' });

module.exports = Camion;
