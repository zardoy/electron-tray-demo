declare module "typed-ipc" {
    interface IpcMainRequests {
        getTraysNumber: {
            data: number;
        };
    }

    interface IpcMainEvents {
        addTrayIcon: void;
        removeTrayIcon: void;
    }
}

export { };