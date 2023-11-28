const express = require('express');
const router = express.Router();
const settings = require('../Controllers/SettingsController');

router.get('/', settings.getSettings);
router.post('/', settings.updateSettings);

module.exports = router;