const DEBUG = true;

const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

function createWindow () {
    const win = new BrowserWindow({
        frame: DEBUG,
        fullscreen: !DEBUG,
        backgroundColor: "#000000",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: DEBUG
        }
    });

    globalShortcut.register('F11', () => {});
    win.loadFile(path.join(__dirname, 'desktop/main.html'));
    if (DEBUG) {
        win.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);