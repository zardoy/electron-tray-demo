import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import electronIsDev from "electron-is-dev";
import windowStateKeeper from "electron-window-state";
import path from "path";

import { getFileFromPublic } from "./getFileFromPublic";

let mainWindow: BrowserWindow | null;

const loadApp = () => {
    createMainWindow();
    bindIpcMainEvents();
};

const bindIpcMainEvents = () => {
    const trays: Tray[] = [];

    ipcMain.on("add-tray-icon", () => {
        const newTray = new Tray(getFileFromPublic("IconTemplate@2x.png"));
        newTray.setContextMenu(
            Menu.buildFromTemplate([
                {
                    label: "Show application",
                    click() {
                        mainWindow?.show();
                    }
                },
                {
                    label: "Exit application",
                    click() {
                        app.exit();
                    }
                }
            ])
        );

        trays.push(newTray);
    });

    ipcMain.on("remove-tray-icon", () => {
        const lastTray = trays.pop();
        if (!lastTray) return;
        lastTray.destroy();
    });

    ipcMain.handle("get-number-of-trays", () => {
        return trays.length;
    });
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