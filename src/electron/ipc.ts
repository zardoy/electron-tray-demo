import { app, Menu, Tray } from "electron";
import { typedIpcMain } from "typed-ipc";

import { mainWindow, trays } from "./";
import { getFileFromPublic } from "./getFileFromPublic";

export const bindIPC = () => {
    typedIpcMain.handleAllRequests({
        getTraysNumber: async () => trays.length
    });

    typedIpcMain.bindAllEventListeners({
        addTrayIcon: () => {
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
        },
        removeTrayIcon: () => {
            const lastTray = trays.pop();
            if (!lastTray) return;
            lastTray.destroy();
        }
    });
};
