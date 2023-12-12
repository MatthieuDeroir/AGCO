const Settings = require('../Models/SettingsModel');

exports.initializeSettings = async () => {
    try {
        // initialize the following setting if they don't exist
        // dureeDefilement: 30,
        // debutVeille: '00:00',
        // finVeille: '00:00',
        // date: Date.now(),
        // createdAt: Date.now(),
        // updatedAt: Date.now()

        const settings = await Settings.findAll();
        if (settings.length === 0) {
            await Settings.create({
                dureeDefilement: 30,
                debutVeille: '00:00',
                finVeille: '00:00',
                date: Date.now(),
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
        }


    } catch (error) {
        console.error('Erreur lors de l\'initialisation des paramètres :', error);
    }
}

exports.getSettings = async (req, res) => {
    try {
        const settings = await Settings.findAll();
        res.status(200).send(settings);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateSettings = async (req, res) => {
    console.log('updateSettings', req.body);
    try {
        await Settings.destroy({});
        const settings = await Settings.create(req.body);
        console.log('settings', settings)
        res.status(201).send(settings);
    } catch (error) {
        console.log('error', error)
        res.status(400).send(error.message);
    }
}