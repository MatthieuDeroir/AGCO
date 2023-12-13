const Media = require('../Models/MediaModel');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const mime = require('mime');

exports.uploadMedia = async (req, res) => {
    try {
        const filePath = req.file.path;
        const mimeType = mime.getType(filePath);
        let type;
        let duration = 0;

        if (mimeType.startsWith('image')) {
            type = 'image';
        } else if (mimeType.startsWith('video')) {
            type = 'video';
        } else {
            fs.unlinkSync(filePath); // Supprimer le fichier s'il n'est pas du bon type
            return res.status(400).send('Invalid media type. Only images and videos are allowed.');
        }

        if (type === 'video') {
            await new Promise((resolve, reject) => {
                ffmpeg.ffprobe(filePath, (err, metadata) => {
                    if (err) return reject(err);
                    duration = Math.floor(metadata.format.duration);
                    resolve();
                });
            });
        }
        else {
            duration = req.body.duration;
        }

        const media = await Media.create({
            type,
            duration,
            path: filePath,
        });
        res.status(201).send(media);

    } catch (error) {
        console.error('Error uploading media:', error);
        res.status(500).send('Error uploading media.');
    }
};


exports.getAllMedia = async (req, res) => {
    try {
        const media = await Media.findAll();
        res.status(200).send(media);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const media = await Media.findByPk(req.params.id);
        if (!media) return res.status(404).send('Media not found');

        // Suppression du fichier
        fs.unlinkSync(path.join(__dirname, '..', '', media.path));


        // Suppression de l'entrée dans la base de données avec Sequelize
        await media.destroy();
        res.status(200).send({ message: 'Media deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.updateMedia = async (req, res) => {
    try {
        const [updateCount] = await Media.update(req.body, {
            where: { id: req.params.id }
        });

        if (updateCount === 0) return res.status(404).send('Media not found');

        const updatedMedia = await Media.findByPk(req.params.id);
        res.status(200).send(updatedMedia);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

