const { BrowserWindow, ipcRenderer, ipcMain } = require('electron');

// IPC renderer helps emits/receives events to electron
const client = ipcRenderer;

/**
 * base.on intercepts events triggered by the ipcRenderer
 * base.send emits event interceptable by the ipcRenderer
 */
const base = {
  on: (event, callback) => ipcMain.on(event, callback),
  send: (event, callback) => {
    BrowserWindow.getFocusedWindow().webContents.send(event, callback);
  },
};

export { client, base };
