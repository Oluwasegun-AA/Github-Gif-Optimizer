import { app, Menu, Tray } from 'electron';
import { env, toggleWindow } from '../utils';
import { menuTemplate, consoleMenu } from './mainMenu';
import dockTemplate from './dockMenu';
import trayMenuTemplate from './trayMenu';

/**
 * @description setup all menu (main, tray and dock menus)
 */
class MenuBars {
  constructor(win, path) {
    this.MAIN_WINDOW = win;
    this.ICON_PATH = path;
  }

  // main menu
  buildMainMenu = () => {
    if (!env.isProd) menuTemplate.push(consoleMenu);
    if (env.isDarwin) menuTemplate.unshift({ label: '' });
    this.MAIN_MENU = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(this.MAIN_MENU);
    return this.MAIN_MENU;
  };

  // dock menu
  buildDock = () => {
    this.DOCK_MENU = Menu.buildFromTemplate(dockTemplate);
    app.dock.setMenu(this.DOCK_MENU);
    // app.dock.hide()
    return this.DOCK_MENU;
  };

  // tray menu
  tray = () => {
    this.TRAY_MENU = Menu.buildFromTemplate(trayMenuTemplate);
    this.TRAY = new Tray(this.ICON_PATH);
    this.TRAY_BOUNDS = this.TRAY.getBounds();
    this.TRAY.on('click', () => toggleWindow(this.MAIN_WINDOW, this.TRAY_BOUNDS));
    this.TRAY.setToolTip('Github-gif-optimizer');
    this.TRAY.on('right-click', () => this.TRAY.popUpContextMenu(this.TRAY_MENU));
    return this.TRAY;
  };
}

export default MenuBars;
