import { BrowserWindow } from 'electron';
import { base, evt } from '../common/index';
import * as codec from './fidioCodec';

// setup browser window events
class BaseEvents {
  static registerEvents = () => {
    base.on(evt.UPLOAD, (event, videos) => codec.probeDuration(event, videos));
    base.on(evt.EXIT, () => BrowserWindow.getFocusedWindow().close());
  };
}

export default BaseEvents;
