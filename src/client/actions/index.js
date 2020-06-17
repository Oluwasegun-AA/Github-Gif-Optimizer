import { LOAD_VIDEO_FILE, REMOVE_VIDEO_FILE, END_IS_DUPLICATE_TOAST } from '../actionTypes';
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

const uploadFile = () => dispatch => {
  client.on(evt.INFO, (e, data) => dispatch(loadFile(data)));
};

const deleteFile = (data) => dispatch => {
  dispatch(removeFile(data));
};

const removeDuplicateToast = () => dispatch => {
  setTimeout(() => dispatch(stopDuplicateToast()), 5000);
};

const removeUploadListener = () => {
  client.removeListener(evt.INFO, () => '');
};



export { uploadFile, deleteFile, removeDuplicateToast, removeUploadListener };
