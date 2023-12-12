const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./Database/Sequelize');

const initialize = require('./Database/Init');


async function startServer() {
    try {
        await sequelize.sync({force: false});
        console.log("All models were synchronized successfully.");

        await initialize();


        // Ensuite, démarrez votre serveur
        const app = require('./Config/Express');
        const port = process.env.PORT || 4000;
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    } catch (error) {
        console.error('Error during model synchronization or server initialization', error);
    }

}

startServer().then(r => console.log("Server started successfully")).catch(e => console.error(e));