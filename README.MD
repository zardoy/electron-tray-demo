# Electron Tray Demo

Simple electron tray demo.

- [Electron Tray Demo](#electron-tray-demo)
  - [Development](#development)
    - [📁 Folder structure](#-folder-structure)
    - [How to start](#how-to-start)

## Development

### 📁 Folder structure

```text
├──📁src/            < All source code
│   ├──📁electron/   < Electron (main process) 
│   ├──📁react/      < React (renderer process)
│   ├──📁react/electron-shared/     < Shared (commonly used for IPC types)
```

### How to start

1. Install dependencies: `yarn` or `npm install`
2. In VSCode press `CMD`(`CTRL`) + `SHIFT` + `B` to run default build task, which will open two terminals for development (electron - main and react - renderer)
