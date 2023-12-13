const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/Sequelize'); // Adjust the path

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize, modelName: 'user' });

module.exports = User;
