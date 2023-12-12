const {initializeCamions} = require('../Controllers/CamionController');
const {initializeSettings} = require('../Controllers/SettingsController');

function initialize() {
    try {
        initializeCamions();
        initializeSettings();
    } catch (error) {
        console.error('Error while initializing', error);
    }
}

module.exports = initialize;
