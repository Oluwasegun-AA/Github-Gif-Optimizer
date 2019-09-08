import { LOAD_VIDEO_FILE } from '../actionTypes';
import { client, evt } from '../../common/index';

export const loadFile = (data) => ({
  type: LOAD_VIDEO_FILE,
  data,
});

const uploadFile = (path) => async (dispatch) => {
  client.send(evt.UPLOAD, path);
  client.on(evt.INFO, (e, data) => {
    dispatch(loadFile(data));
  });
};

export default uploadFile;
