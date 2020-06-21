import {
  PREVIEW,
  CLEAR_ALL,
  LOAD_VIDEO_FILE,
  PROGRESS_UPDATE,
  REMOVE_VIDEO_FILE,
  END_IS_DUPLICATE_TOAST
} from '../actionTypes';
import { client, evt } from '../../common/index';

export const loadFile = (data) => ({
  type: LOAD_VIDEO_FILE,
  data,
});

export const removeFile = (data) => ({
  type: REMOVE_VIDEO_FILE,
  data,
});

export const stopDuplicateToast = () => ({
  type: END_IS_DUPLICATE_TOAST,
});

export const updateConversionProgress = (data) => ({
  type: PROGRESS_UPDATE,
  data
});

export const previewItem = (name) => ({
  type: PREVIEW,
  data: { name, isFilePreview: true }
});

export const canclePreview = (name) => ({
  type: PREVIEW,
  data: { name, isFilePreview: false }
});

export const clearAll = () => ({
  type: CLEAR_ALL
});

const uploadFile = () => dispatch => {
  client.on(evt.INFO, (e, data) => dispatch(loadFile(data)));
};

const deleteFile = (data) => dispatch => {
  dispatch(removeFile(data));
};

const previewFile = (data) => dispatch => {
  dispatch(previewItem(data));
};

const cancleFilePreview = (data) => dispatch => {
  dispatch(canclePreview(data));
};

const clearAllFiles = () => dispatch => {
  dispatch(clearAll());
};

const removeDuplicateToast = () => dispatch => {
  setTimeout(() => dispatch(stopDuplicateToast()), 5000);
};

const saveConversionProgress = () => dispatch => {
  client.once(evt.PROGRESS_REPORT, (e, data) => dispatch(updateConversionProgress(data)));
};


const removeInfoListener = () => {
  client.removeListener(evt.INFO, () => '');
};
const removeProgressListener = () => {
  client.removeListener(evt.PROGRESS_REPORT, () => '');
};

export {
  uploadFile,
  deleteFile,
  previewFile,
  clearAllFiles,
  cancleFilePreview,
  removeInfoListener,
  removeDuplicateToast,
  removeProgressListener,
  saveConversionProgress,
};
