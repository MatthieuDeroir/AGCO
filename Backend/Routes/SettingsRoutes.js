const express = require('express');
const router = express.Router();
const settings = require('../Controllers/SettingsController');
const auth = require("../Middlewares/Auth");

router.get('/', settings.getSettings);
router.put('/', auth, settings.updateSettings);

module.exports = router;