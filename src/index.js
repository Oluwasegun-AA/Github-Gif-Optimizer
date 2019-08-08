import { app, BrowserWindow } from 'electron';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import {ipcMain } from 'electron';

let win;
const server = {
  get: (event, callback) => ipcMain.on(event, callback),
  send: (mainWindow, event, callback) => mainWindow.webContents.send(event, callback)
};

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  win.loadURL(`file:///${path.resolve(`{__dirname}/../`, 'ui/index.html')}`);
});


const ale =(event, path)=> {
  console.log('wink')
  ffmpeg.ffprobe(path, (err, metadata) => {
    console.log('duration ==',   metadata.format.duration);
  })
};

server.get('videoFile', (event, path)=> ale(event, path));
