const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Database/Sequelize'); // Adjust the path

class Media extends Model {}

Media.init({
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['image', 'video']]
        }
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, { sequelize, modelName: 'media' });

module.exports = Media;
