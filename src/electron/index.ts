import { app } from "electron";

const loadApp = () => {
    createMainWindow();
};

const createMainWindow = () => {
    // Your custom code to initialize main window here
};

app.on("ready", loadApp);