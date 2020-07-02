/* eslint-disable no-nested-ternary */
import { app, BrowserWindow } from 'electron';

// returns the OS environment where the applications runs
const env = {
  isDarwin: process.platform === 'darwin',
  isDev: process.env.NODE_ENV === 'test',
};

// deletes all created windows from memory
const cleanup = () => {
  app.on('quit', () => {
    BrowserWindow.getAllWindows().forEach(win => { win = null; return win; });
  });
};

/**
 * @description toggles window's visibility when tray is clicked
 * @param {*} win window to display
 * @param {Obj} bounds screen position
 */
const toggleWindow = (win, bounds) => {
  const { x, y } = bounds;
  const { height, width } = win.getBounds();
  const yPosition = env.isDarwin ? y : y - height;
  win.setBounds({
    x: x - width / 2,
    y: yPosition,
    height,
    width,
  });
  const toggle = win.isVisible() ? win.isFocused() ? win.hide() : win.show() : win.show();
  return toggle;
};

export { cleanup, toggleWindow, env };
