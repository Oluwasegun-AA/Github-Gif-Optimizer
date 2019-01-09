import { BrowserWindow } from 'electron';
import { base, evt } from '../common/index';
import * as codec from './fidioCodec';

class BaseEvents {
  static registerEvents = () => {
    base.on(evt.UPLOAD, (event, path) => codec.probeDuration(event, path));
    base.on(evt.EXIT, () => BrowserWindow.getFocusedWindow().close());
  };
}

export default BaseEvents;
