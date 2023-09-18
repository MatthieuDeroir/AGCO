const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    debutVeille: {
        type: String,
        required: true
    },
    finVeille: {
        type: String,
        required: true
    }
});

const Settings = mongoose.model('Settings', SettingsSchema);
module.exports = Settings;
