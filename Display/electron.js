const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 320,
        height: 640,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
        },
        frame: false, // Supprimer la barre de titre
        x: 0, // Position X en haut à gauche
        y: 0, // Position Y en haut à gauche
    });

    mainWindow.loadURL(
        'http://127.0.0.1:3000' ||
        `file://${__dirname}/build/index.html`
    );

    mainWindow.openDevTools(); // Ouvrir les DevTools

    mainWindow.setAlwaysOnTop(true); // Garder la fenêtre toujours au-dessus


    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
