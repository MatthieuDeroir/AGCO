const Media = require('../Models/Media');
const fs = require('fs');
const path = require('path');

exports.uploadMedia = async (req, res) => {
    // TODO: Ajoutez la logique d'upload ici
};

exports.getAllMedia = async (req, res) => {
    try {
        const media = await Media.find();
        res.status(200).send(media);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) return res.status(404).send('Media not found');

        // Suppression du fichier
        fs.unlinkSync(path.join(__dirname, '..', 'media', media.path));

        // Suppression de l'entrée dans la base de données
        await media.remove();
        res.status(200).send(media);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateMedia = async (req, res) => {
    try {
        const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!media) return res.status(404).send('Media not found');
        res.status(200).send(media);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
