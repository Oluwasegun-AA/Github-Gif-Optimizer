const { BrowserWindow, ipcRenderer, ipcMain } = require('electron');

const client = ipcRenderer;
const base = {
  on: (event, callback) => ipcMain.on(event, callback),
  send: (event, callback) => {
    BrowserWindow.getFocusedWindow().webContents.send(event, callback);
  },
};

export { client, base };
