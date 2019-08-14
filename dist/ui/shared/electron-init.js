"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _electron = require("electron");

const client = _electron.ipcRenderer;
const server = {
  get: (event, callback) => _electron.ipcMain.on(event, callback),
  send: (mainWindow, event, callback) => mainWindow.webContents.send(event, callback)
};
var _default = {
  client,
  server
};
exports.default = _default;