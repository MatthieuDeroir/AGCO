const {initializeSettings} = require('../Controllers/SettingsController');

function initialize() {
    try {
        initializeSettings();
    } catch (error) {
        console.error('Error while initializing', error);
    }
}

module.exports = initialize;