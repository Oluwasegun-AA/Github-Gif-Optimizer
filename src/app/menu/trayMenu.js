import { app } from 'electron';

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

export { trayMenuTemplate };
