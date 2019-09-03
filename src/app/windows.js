import { BrowserWindow } from 'electron';
import { cleanup, GlobalShortcuts } from './utils';

class CreateWindow {
  constructor(url, height, width) {
    this.WINDOW_HEIGHT = height || 600;
    this.WINDOW_WIDTH = width || 600;
    this.URL = url;
  }

  mainWindow = () => {
    this.win = this.newWindow();
    GlobalShortcuts.register();
    this.win.on('focus', () => {
      // send an event
    });
    this.win.on('will-quit', () => {
      GlobalShortcuts.unregister();
    });
    this.win.on('quit', () => cleanup());
    return this.win;
  };

  newWindow = (...customConfig) => {
    let createdWindow = new BrowserWindow({
      height: this.WINDOW_HEIGHT,
      width: this.WINDOW_WIDTH,
      webPreferences: {
        nodeIntegration: true,
        backgroundThrottling: false,
        // frame: false,
        // resizable: false
      },
      ...customConfig,
    });
    createdWindow.loadURL(this.URL);
    createdWindow.on('blur', () => createdWindow.hide());
    createdWindow.on('close', () => {
      createdWindow = null;
    });
    return createdWindow;
  };
}

export default CreateWindow;
