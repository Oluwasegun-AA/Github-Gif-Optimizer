import { app, shell } from 'electron';

// setup main menu template
const menuTemplate = [
  {
    label: 'VidInfo',
    submenu: [
      {
        label: 'About Github-gif-optimizer',
        click() {
          shell.openExternal('https://github.com/Oluwasegun-AA/Github-gif-optimizer');
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Quit Github-gif-optimizer',
        accelerator: 'CmdOrCtrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];

// optional console menu for development env
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
