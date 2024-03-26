const sequelize = require('../Database/Sequelize');

const Camion = require('./CamionModel');
const Media = require('./MediaModel');
const User = require('./UserModel');
const Settings = require('./SettingsModel');

module.exports = {
    Camion,
    Media,
    User,
    Settings
};
