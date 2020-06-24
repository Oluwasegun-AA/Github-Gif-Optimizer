const { BrowserWindow, ipcRenderer, ipcMain } = require('electron');

// IPC renderer helps emits/receives events to/from electron
const client = ipcRenderer;

/**
 * base.on intercepts events triggered by the ipcRenderer(client side)
 * base.send emits event interceptable by the ipcRenderer
 */
const base = {
  on: (event, callback) => ipcMain.on(event, callback),
  send: (event, callback, win) => (
    BrowserWindow.getFocusedWindow() !== null
      ? BrowserWindow.getFocusedWindow().webContents.send(event, callback)
      : win.webContents.send(event, callback))
};

export { client, base };
