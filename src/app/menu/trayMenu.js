import { app } from 'electron';

// tray menu options setup
const trayMenuTemplate = [
  {
    label: 'Check for Updates',
  },
  {
    type: 'separator',
  },
  {
    label: 'Quit Fidio',
    click() {
      app.quit();
    },
  },
];

export default trayMenuTemplate;
