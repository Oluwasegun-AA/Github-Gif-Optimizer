"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _electron = require("electron");

var _path = _interopRequireDefault(require("path"));

var _fluentFfmpeg = _interopRequireDefault(require("fluent-ffmpeg"));

let win;
const server = {
  get: (event, callback) => _electron.ipcMain.on(event, callback),
  send: (mainWindow, event, callback) => mainWindow.webContents.send(event, callback)
};

_electron.app.on('ready', () => {
  win = new _electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadURL(`file:///${_path.default.resolve(`{__dirname}/../`, 'ui/index.html')}`);
});

const ale = (event, path) => {
  console.log('wink');

  _fluentFfmpeg.default.ffprobe(path, (err, metadata) => {
    console.log('duration ==', metadata.format.duration);
  });
};

server.get('videoFile', (event, path) => ale(event, path));