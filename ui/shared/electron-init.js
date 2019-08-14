import { ipcRenderer, ipcMain } from 'electron';

const client = ipcRenderer;
const server = {
  get: (event, callback) => ipcMain.on(event, callback),
  send: (mainWindow, event, callback) => mainWindow.webContents.send(event, callback)
};

export default {
  client,
  server
};
