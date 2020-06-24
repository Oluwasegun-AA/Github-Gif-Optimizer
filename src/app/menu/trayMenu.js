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
    label: 'Quit Github-gif-optimizer',
    click() {
      app.quit();
    },
  },
];

export default trayMenuTemplate;
