const Camion = require('../Models/CamionModel');


exports.addCamion = async (req, res) => {
    try {

        const camion = await Camion.create(req.body);
        res.status(201).send(camion);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send('Camion already exists');
        } else {
            res.status(400).send(error.message);
        }
    }
};


exports.getCamions = async (req, res) => {
    try {
        const camions = await Camion.findAll({
            order: [['date_appel', 'ASC']] // Tri par date_appel en ordre décroissant
        });
        res.status(200).send(camions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};



exports.deleteCamion = async (req, res) => {
    try {
        const result = await Camion.destroy({
            where: { id: req.body.id }
        });

        if (result === 0) return res.status(404).send('Camion not found');
        res.status(200).send({ message: 'Camion deleted' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.updateCamions = async (req, res) => {
    console.log("CamionController.updateCamions: req.body:", req.body);
    try {
        // Cette opération supprimera tous les camions et insérera les nouveaux
        await Camion.destroy({ where: {} });
        const camions = await Camion.bulkCreate(req.body);
        res.status(201).send(camions);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
