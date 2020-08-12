import path from 'path';
import url from 'url';
import { app, BrowserWindow } from 'electron';
// import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';

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

// app.whenReady().then(() => {
//     installExtension(REDUX_DEVTOOLS)
//         .then((name: string) => console.log(`Added Extension:  ${name}`))
//         .catch((err: Error) => console.log('An error occurred: ', err));
// });

app.allowRendererProcessReuse = true;
