import { app, BrowserWindow, Tray } from "electron";
import electronIsDev from "electron-is-dev";
import windowStateKeeper from "electron-window-state";
import path from "path";

import { bindIPC } from "./ipc";

export let mainWindow: BrowserWindow | null;

export const trays: Tray[] = [];

const loadApp = () => {
    createMainWindow();
    bindIPC();
};

const createMainWindow = () => {
    const windowState = windowStateKeeper({
        fullScreen: false
    });

    mainWindow = new BrowserWindow({
        ...windowState,
        width: 600,
        height: 300,
        center: true,
        resizable: false,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    });
    mainWindow.loadURL(electronIsDev ? "http://localhost:3500" : `file://${path.join(__dirname, "../build/index.html")}`);
    // if (electronIsDev) mainWindow.webContents.openDevTools();

    mainWindow.on("close", () => mainWindow = null);

    windowState.manage(mainWindow);
};

app.on("ready", loadApp);