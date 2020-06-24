import { find, isEmpty, findIndex } from 'lodash';
import {
  PREVIEW,
  CLEAR_ALL,
  LOAD_VIDEO_FILE,
  PROGRESS_UPDATE,
  REMOVE_VIDEO_FILE,
  END_IS_DUPLICATE_TOAST
} from '../actionTypes';

const removeDuplicates = ({ filesInfo }, newItems) => newItems.filter(({ name }) => !find(filesInfo, { name }));
const getDuplicates = ({ filesInfo }, newItems) => {
  const data = newItems.filter(({ name }) => !!find(filesInfo, { name }));
  return data;
};

const removeFile = (state, { data }) => state.filesInfo.filter(({ name }) => name !== data);

const editExistingData = ({ filesInfo }, data) => {
  const newFiles = [...filesInfo];
  const item = find(newFiles, { name: data.name });
  const index = findIndex(newFiles, { name: data.name });
  newFiles[index] = { ...item, ...data };
  return newFiles;
};

const initialState = {
  filesInfo: [],
  duplicates: [],
  isDuplicate: false,
  isPreview: false,
  isConversionStart: false
};

const uploadReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_VIDEO_FILE:
      return {
        filesInfo: [...state.filesInfo, ...removeDuplicates(state, action.data)],
        duplicates: getDuplicates(state, action.data),
        isDuplicate: !isEmpty(getDuplicates(state, action.data))
      };
    case REMOVE_VIDEO_FILE:
      return {
        ...state,
        filesInfo: [...removeFile(state, action)],
        isPreview: false
      };
    case PREVIEW:
      return {
        ...state,
        filesInfo: [...editExistingData(state, action.data)],
        isPreview: action.data.isFilePreview
      };
    case END_IS_DUPLICATE_TOAST:
      return {
        ...state,
        isDuplicate: false
      };
    case PROGRESS_UPDATE:
      return {
        ...state,
        filesInfo: [...editExistingData(state, action.data)],
        isConversionStart: true
      };
    case CLEAR_ALL:
      return {
        ...state,
        filesInfo: [],
        isPreview: false
      };
    default:
      return state;
  }
};

export default uploadReducer;
