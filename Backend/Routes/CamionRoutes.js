const express = require('express');
const router = express.Router();
const camionsController = require('../Controllers/CamionController');

// Définition des routes pour les camions
router.post('/add', (req, res) => {
    console.log("CamionRoutes.add: req.body:", req.headers, req.body);
    camionsController.addCamion(req, res);
});

router.get('/', camionsController.getCamions);
router.post('/remove/:id', camionsController.deleteCamion);
router.post('/update-list', camionsController.updateCamions);

module.exports = router;
