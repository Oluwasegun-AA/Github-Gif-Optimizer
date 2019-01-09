import { app, BrowserWindow } from 'electron';
import Env from './Env';

const cleanup = () => {
  app.on('quit', () => {
    BrowserWindow.getAllWindows().forEach(win => {
      win = null;
    });
  });
};

const toggleWindow = (win, bounds) => {
  const { x, y } = bounds;
  const { height, width } = win.getBounds();
  const yPosition = Env.isDarwin() ? y : y - height;
  win.setBounds({
    x: x - width / 2,
    y: yPosition,
    height,
    width,
  });
  const toggle = win.isVisible() ? win.hide() : win.show();
  return toggle;
};

export { cleanup, toggleWindow };
