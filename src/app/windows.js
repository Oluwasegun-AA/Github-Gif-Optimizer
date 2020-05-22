import { BrowserWindow } from 'electron';
import { isUndefined } from 'lodash';
import { cleanup, GlobalShortcuts } from './utils';

/**
 * @description implements primary / secondary window creation logic
 */
class CreateWindow {
  constructor(url, height = undefined, width) {
    this.WINDOW_HEIGHT = height || 600;
    this.WINDOW_WIDTH = width || 600;
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
        backgroundThrottling: false,
        // frame: false,
        // resizable: false
      },
      ...customConfig,
    });
    createdWindow.setMinimumSize(381, 381);
    createdWindow.loadURL(this.URL);
    createdWindow.on('blur', () => createdWindow.hide());
    createdWindow.on('close', () => {
      createdWindow = null;
    });
    createdWindow.on('will-resize', (e, { height, width }) => {
      const win = BrowserWindow.getFocusedWindow();
      if (height !== width) {
        const size = Math.min(height, width);
        e.preventDefault();
        return win.setSize(size, size);
      }
    });

    return createdWindow;
  };
}

export default CreateWindow;
