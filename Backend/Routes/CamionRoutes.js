const express = require('express');
const router = express.Router();
const camionsController = require('../Controllers/CamionController');
const auth = require('../Middlewares/Auth');

// Définition des routes pour les camions
router.post('/add', (req, res) => {
    console.log("CamionRoutes.add: req.body:", req.headers, req.body);
    camionsController.addCamion(req, res);
});

router.get('/', camionsController.getCamions);
router.post('/remove/:id', auth, camionsController.deleteCamion);
router.post('/update-list', auth, camionsController.updateCamions);
router.put('/update/:id', auth, camionsController.updateOne);
router.post('/update-multiple', auth, camionsController.updateMultipleCamion);


module.exports = router;
