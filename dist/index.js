"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _electron = _interopRequireDefault(require("electron"));

var _path = _interopRequireDefault(require("path"));

const {
  app,
  BrowserWindow
} = _electron.default;
app.on('ready', () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    }
  });
  win.loadURL(`file:///${_path.default.resolve(`{__dirname}/../`, 'ui/index.html')}`);
});