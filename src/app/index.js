import { app } from 'electron';
import path from 'path';
import CreateWindow from './windows';
import MenuBars from './menu/menu';
import { env } from './utils';
import IPC from './BaseEventsManager';

// eslint-disable-next-line no-unused-vars
let menu, dock, tray, events;
let mainWindow;
const url = env.isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '../../build/index.html')}`;

// setup primary window on startup
app.on('ready', () => {
  mainWindow = new CreateWindow(url, 500, 500).mainWindow();
  menu = new MenuBars(mainWindow);
  menu.buildMainMenu();
  dock = menu.buildDock();
  tray = menu.tray();
  events = new IPC(mainWindow).registerEvents();
});
