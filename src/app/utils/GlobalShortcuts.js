import { globalShortcut } from 'electron';

export default class GlobalShortcuts {
  static register = () => {
    globalShortcut.register('Ctrl+F', () => {
      // send a ready event to trigger home view
    });
  };

  static unregister = () => {
    globalShortcut.unregisterAll();
  };
}
