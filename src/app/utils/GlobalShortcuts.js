import { globalShortcut } from 'electron';

/**
 * @description Global shortcut class
 */
export default class GlobalShortcuts {
  // register shortcuts
  static register = () => {
    globalShortcut.register('Ctrl+F', () => {
      // send a ready event to trigger home view
    });
  };

  // unregister shortcuts
  static unregister = () => {
    globalShortcut.unregisterAll();
  };
}
