const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    debutVeille: {
        type: String,
        required: true
    },
    finVeille: {
        type: String,
        required: true
    },
    dureeDefilement: {
        type: Number,
        default: 30
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Settings = mongoose.model('Settings', SettingsSchema);
module.exports = Settings;
