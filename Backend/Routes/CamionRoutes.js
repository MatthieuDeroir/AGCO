const express = require('express');
const router = express.Router();
const camionsController = require('../Controllers/CamionController');

// Définition des routes pour les camions
console.log(router.post('/add', camionsController.addCamion));
router.get('/', camionsController.getCamions);
router.delete('/:id', camionsController.deleteCamion);
router.post('/update', camionsController.updateCamions);

module.exports = router;
