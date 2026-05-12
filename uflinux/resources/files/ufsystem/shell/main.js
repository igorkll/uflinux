let DEBUG = true
let WINDOWED = true

const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')
const fs = require('fs')

if (fs.existsSync("/ufsystem")) {
    DEBUG = fs.existsSync("/uflinux_debug.flag")
    WINDOWED = false
}

function createWindow() {
    const win = new BrowserWindow({
        frame: WINDOWED,
        fullscreen: !WINDOWED,
        backgroundColor: "#000000",
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: DEBUG
        }
    })

    globalShortcut.register('F11', () => {})
    win.loadFile(path.join(__dirname, 'applets/desktop/main.html'))
    if (DEBUG) {
        win.webContents.openDevTools()
    }
}

function createWindow_lockscreen() {
    const win = new BrowserWindow({
        frame: false,
        fullscreen: true,
        backgroundColor: "#000000",
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: DEBUG
        }
    })

    globalShortcut.register('F11', () => {})
    win.loadFile(path.join(__dirname, 'applets/lockscreen/main.html'))
    if (DEBUG) {
        win.webContents.openDevTools()
    }
}

console.log(process.argv[2])

switch (process.argv[2]) {
    case "lockscreen":
        app.whenReady().then(createWindow_lockscreen)
        break

    default:
        app.whenReady().then(createWindow)
        break
}
