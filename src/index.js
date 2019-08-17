import { app, BrowserWindow, shell, Menu, Notification, Tray } from 'electron';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { ipcMain } from 'electron';

let mainWindow;
let newWindow;
let tray;
const server = {
  get: (event, callback) => ipcMain.on(event, callback),
  send: (event, callback) => mainWindow.webContents.send(event, callback)
};

const menuTemplate = [
  {
    label: 'VidInfo',
    submenu: [
      {
        label: 'About vidInfo',
        click() {
          shell.openExternal('https://github.com/Oluwasegun-AA/vidinfo');
        }
      },
      {
        type: "separator"
      },
      {
        label: 'Settings',
        click(){
          // activeWindow.toggleDevTools();
          createNewWindow('ui/settings.html', 'Settings');
          // new Notification({
          //   title: 'notify',
          //   body: 'I am warning you o!'
          // }).show();
        }
      },
      {
        label: 'Quit VidInfo',
        accelerator: 'CmdOrCtrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];


process.env.NODE_ENV !== 'production' ? menuTemplate.push({
  label: 'Dev Console',
  submenu: [{
    label: "toggle console",
    accelerator: "Alt+Cmd+I",
  click(item, activeWindow) {
    activeWindow.toggleDevTools();
  }}]}): null;

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

const trayMenuTemplate = [
  {
    label: 'Open vidInfo',
    click(e) {
      const bounds = tray.getBounds()
      toggleWindow(e, bounds)
    }
  },{
    label: 'Check for Updates'
  },{
    type: 'separator'
  },
  {
    label: 'Quit VidInfo',
    click() {
      app.quit()
    }
  }
]
const trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
const mainMenu = Menu.buildFromTemplate(menuTemplate);
const dockMenu = Menu.buildFromTemplate(dockTemplate);

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      backgroundColor: 'red'
    },
    show: false
    // frame: false,
    // resizable: false,
  });
  mainWindow.loadURL(`file://${path.resolve(`__dirname/../`, 'ui/index.html')}`);
  app.dock.setMenu(dockMenu) 
  // app.dock.hide()
  Menu.setApplicationMenu(mainMenu)
  // mainWindow.setProgressBar(0.9)
  mainWindow.on('close', ()=> app.quit());
  const iconPath = `${path.resolve(`__dirname/../`, 'ui/assets/logo.png')}`;
  tray = new Tray(iconPath)
  tray.on('click', toggleWindow);
  tray.setToolTip('VidInfo');
  tray.on('right-click', ()=> tray.popUpContextMenu(trayMenu));
  mainWindow.on('blur', ()=> mainWindow.hide())
});

const createNewWindow =(filePath, title)=> {
  newWindow = new BrowserWindow({
    width: 400,
    height: 300,
    backgroundColor: 'red',
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    },
    title
  });
  newWindow.loadURL(`file://${path.resolve(`__dirname/../`, filePath)}`);
  newWindow.on('close', ()=> newWindow = null);
  newWindow.on('blur', ()=> newWindow.hide())
};


const toggleWindow =(e, bounds)=>{
  const {x,y} = bounds;
  const {height, width} = mainWindow.getBounds();
  const yPosition = process.platform == "darwin" ? y : y - height;
  mainWindow.setBounds({
    x: x - width/2,
    y: yPosition,
    height,
    width
  });
  mainWindow.isVisible()
  ? mainWindow.hide()
  : mainWindow.show();
}



const probeDuration = (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    server.send('videoDuration', metadata.format.duration)
  })
};

server.get('videoFile', (event, path) => probeDuration(event, path));
server.get('exit', (event, path) => newWindow.close());
