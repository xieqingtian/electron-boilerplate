import path from 'path';
import url from 'url';
import fs from 'fs-extra';
import { app, BrowserWindow, session } from 'electron';

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
    const devtoolsDir = 'devtools';
    const isElectron9 = !!session.defaultSession.getExtension;
    const installedDevtools = isElectron9
        ? session.defaultSession.getAllExtensions().map((item) => item.name)
        : Object.keys(BrowserWindow.getDevToolsExtensions());

    fs.readdirSync(devtoolsDir).forEach((toolName) => {
        const toolPath = path.resolve(devtoolsDir, toolName);

        if (installedDevtools.includes(toolName)) return;
        if (isElectron9) {
            session.defaultSession.loadExtension(toolPath).catch((error) => {
                console.log(error);
            });
        } else {
            BrowserWindow.addDevToolsExtension(toolPath);
        }
    });
};

const createWindow = () => {
    win = new BrowserWindow({
        width: 900,
        height: 700,
        icon: 'logo.ico',
        title: 'Electron App',
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

app.whenReady().then(() => {
    if (isDevelopment && win) installExtensions();
});

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
