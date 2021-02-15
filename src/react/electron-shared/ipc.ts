declare module "typed-ipc" {
    interface IpcMainQueries {
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