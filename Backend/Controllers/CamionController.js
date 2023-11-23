const Camion = require('../Models/CamionSchema');

exports.addCamion = async (req, res) => {
    try {
        console.log("CamionController.addCamion: req.body:", req.body);
        // req.body must be converted to a JSON object
        const camionjson = JSON.parse(req.body.camion);
        const camion = new Camion(camionjson);
        await camion.save();
        res.status(201).send(camion);
    } catch (error) {
        res.status(400).send(error.message);
        console.log("CamionController.addCamion: error:", error.message);
    }
};

exports.getCamions = async (req, res) => {
    try {
        const camions = await Camion.find().sort({ date_appel: -1 }); 
        res.status(200).send(camions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.deleteCamion = async (req, res) => {
    try {
        const camion = await Camion.findByIdAndDelete(req.params.id);
        if (!camion) return res.status(404).send('Camion not found');
        res.status(200).send(camion);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCamions = async (req, res) => {
    try {
        await Camion.deleteMany({});
        const camions = await Camion.insertMany(req.body);
        res.status(201).send(camions);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
