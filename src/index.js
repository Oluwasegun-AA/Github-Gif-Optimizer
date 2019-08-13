import { app, BrowserWindow, Menu, Notification } from 'electron';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { ipcMain } from 'electron';

let mainWindow;
let newWindow;
const server = {
  get: (event, callback) => ipcMain.on(event, callback),
  send: (event, callback) => mainWindow.webContents.send(event, callback)
};

const menuTemplate = [
  {
    label: 'VidInfo',
    submenu: [
      {
        label: 'Settings',
        click(){
          createNewWindow('ui/index.html', 'Settings');
          new Notification({
            title: 'notify',
            body: 'I am warning you o!'
          }).show();
        }
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];
process.platform === 'darwin' ? menuTemplate.unshift({
  label: 'wink'
}) : null;

const dockTemplate = [
  {
    label: 'New Window',
    click () { console.log('New Window') }
  }, {
    label: 'New Window with Settings',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
];

const mainMenu = Menu.buildFromTemplate(menuTemplate);
const dockMenu = Menu.buildFromTemplate(dockTemplate);

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      backgroundColor: 'red'
    }
  });
  mainWindow.loadURL(`file://${path.resolve(`__dirname/../`, 'ui/index.html')}`);
  Menu.setApplicationMenu(mainMenu)
  app.dock.setMenu(dockMenu)
});

const createNewWindow =(filePath, title)=> {
  newWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      backgroundColor: 'red'
    },
    title
  });
  newWindow.loadURL(`file://${path.resolve(`__dirname/../`, filePath)}`);
};

const ale = (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    server.send('videoDuration', metadata.format.duration)
  })
};

server.get('videoFile', (event, path) => ale(event, path));
