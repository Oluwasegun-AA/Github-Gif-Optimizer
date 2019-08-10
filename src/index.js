import { app, BrowserWindow } from 'electron';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import {ipcMain } from 'electron';

let win;
const server = {
  get: (event, callback) => ipcMain.on(event, callback),
  send: (event, callback) => win.webContents.send(event, callback)
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
  ffmpeg.ffprobe(path, (err, metadata) => {
    server.send('videoDuration', metadata.format.duration)
  })
};

server.get('videoFile', (event, path)=> ale(event, path));
