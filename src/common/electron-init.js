const { ipcRenderer, ipcMain } = require('electron');

const client = ipcRenderer;
const base = {
  on: (event, callback) => ipcMain.on(event, callback),
  send: (mainWindow, event, callback) => {
    mainWindow.webContents.send(event, callback);
  },
};

export { client, base };
