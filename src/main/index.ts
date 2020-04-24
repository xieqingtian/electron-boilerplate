import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import fs from 'fs';

let win: BrowserWindow | null;
let pageUrl = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
});
const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
    pageUrl = `http://localhost:4200`;
}

const installExtensions = () => {
    try {
        const installedDevtools = Object.keys(BrowserWindow.getDevToolsExtensions());
        const devtoolsDir = 'devtools';
        const devtoolsPath = fs
            .readdirSync(devtoolsDir)
            .map((toolName) =>
                installedDevtools.includes(toolName) ? '' : path.join(devtoolsDir, toolName),
            )
            .filter((toolPath) => toolPath !== '');
        devtoolsPath.forEach((item) => BrowserWindow.addDevToolsExtension(item));
    } catch (error) {
        // console.error(error.message);
    }
};

const createWindow = () => {
    if (isDevelopment) {
        installExtensions();
    }

    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
        },
    });

    win.webContents.once('dom-ready', () => {
        if (isDevelopment && win) win.webContents.openDevTools();
    });

    win.on('closed', () => {
        win = null;
    });

    win.loadURL(pageUrl);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

app.allowRendererProcessReuse = true;
