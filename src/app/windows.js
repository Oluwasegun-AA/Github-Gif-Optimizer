import { BrowserWindow } from 'electron';
import { isUndefined } from 'lodash';
import { cleanup, GlobalShortcuts } from './utils';

/**
 * @description implements primary / secondary window creation logic
 */
class CreateWindow {
  constructor(url, height = undefined, width) {
    this.WINDOW_HEIGHT = height || 500;
    this.WINDOW_WIDTH = width || 500;
    this.URL = url;
    this.bounds = isUndefined(width) && isUndefined(height)
      ? BrowserWindow.getFocusedWindow().getBounds()
      : { height: undefined, width: undefined };
  }

  // creates primary window
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

  // creates a secondary window
  newWindow = (...customConfig) => {
    let createdWindow = new BrowserWindow({
      height: this.bounds.height || this.WINDOW_HEIGHT,
      width: this.bounds.width || this.WINDOW_WIDTH,
      x: this.bounds.x || null,
      y: this.bounds.y || null,
      webPreferences: {
        nodeIntegration: true,
        backgroundThrottling: false, // disable pause when window is out of view
        resizable: false
      },
      ...customConfig,
    });
    createdWindow.setMinimumSize(500, 500);
    createdWindow.loadURL(this.URL);
    createdWindow.on('close', () => {
      createdWindow = null;
    });

    return createdWindow;
  };
}

export default CreateWindow;
