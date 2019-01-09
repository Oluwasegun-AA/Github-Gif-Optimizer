import { app, shell } from 'electron';
import CreateWindow from '../windows';

const menuTemplate = [
  {
    label: 'VidInfo',
    submenu: [
      {
        label: 'About Fidio',
        click() {
          shell.openExternal('https://github.com/Oluwasegun-AA/vidinfo');
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Settings',
        click() {
          CreateWindow(400, 300, 'ui/settings.html').newWindow({
            title: 'settings',
          });
        },
      },
      {
        label: 'Quit Fidio',
        accelerator: 'CmdOrCtrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo',
      },
      {
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        role: 'cut',
      },
      {
        role: 'copy',
      },
      {
        role: 'paste',
      },
      {
        role: 'selectall',
      },
      {
        type: 'separator',
      },
    ],
  },
];

const consoleMenu = {
  label: 'Dev Console',
  submenu: [
    {
      label: 'Toggle console',
      accelerator: 'Alt+Cmd+I',
      click(item, activeWindow) {
        activeWindow.toggleDevTools();
      },
    },
    {
      type: 'separator',
    },
    {
      role: 'reload',
    },
    {
      role: 'forcereload',
    },
    {
      type: 'separator',
    },
    {
      role: 'togglefullscreen',
    },
  ],
};

export { menuTemplate, consoleMenu };
