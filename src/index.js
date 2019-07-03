import electron from 'electron';
import path from 'path';

const {app, BrowserWindow} = electron;

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    }
  })
  win.loadURL(`file:///${path.resolve(`{__dirname}/../`, 'ui/index.html')}`)
})
