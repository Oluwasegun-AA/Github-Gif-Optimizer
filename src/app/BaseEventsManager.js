import { BrowserWindow, shell } from 'electron';
import { base, evt } from '../common/index';
import * as codec from './fidioCodec';

// setup browser window events
class BaseEvents {
  constructor(win) {
    this.win = win;
  }

  registerEvents = () => {
    base.on(evt.UPLOAD, (event, videos) => codec.probeDuration(event, videos, this.win));
    base.on(evt.EXIT, () => BrowserWindow.getFocusedWindow().close());
    base.on(evt.CONVERT, (e, videos) => codec.startConversion(e, videos, this.win));
    base.on(evt.OPEN_IN_FOLDER, (e, path) => shell.showItemInFolder(path));
  };
}

export default BaseEvents;
