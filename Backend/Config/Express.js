const express = require('express');
const cors = require('cors');
const Routes = require('../Routes/index');

const app = express();

const configureApp = () => {
    app.use(cors());
    app.use(express.json());

    // Routes
    // Utilisation des routes pour les camions
    app.use('/api/camions', Routes.Camion);
// Utilisation des routes pour les médias
    app.use('/api/media-management', Routes.Media);
// Route statique pour les médias
    app.use('/api/media', express.static('media'));
// Utilisation des routes pour l'authentification
    app.use('/api/auth', Routes.User);
// Utilisation des routes pour les paramètres
    app.use('/api/settings', Routes.Settings);

    app.use((err, req, res, next) => {
        console.error("error", err.stack);
        res.status(500).send('Something broke!');
    });
};

configureApp();

module.exports = app;