import { base, client } from './electron-init';
import * as evt from './events';
import {
  getType,
  getName,
  getSize,
  getDuration,
  checkFileExists,
  getOutputFilePath,
  getOptimizedProperties
} from './helpers';

// central point for common files collection
export {
  base,
  client,
  evt,
  getType,
  getName,
  getSize,
  getDuration,
  checkFileExists,
  getOutputFilePath,
  getOptimizedProperties
};
