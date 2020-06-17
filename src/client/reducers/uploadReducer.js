import { find, isEmpty } from 'lodash';
import { LOAD_VIDEO_FILE, REMOVE_VIDEO_FILE, END_IS_DUPLICATE_TOAST } from '../actionTypes';

const removeDuplicates = ({ fileInfo }, newItems) => {
  return newItems.filter(({ name }) => !find(fileInfo, { name }));
};
const getDuplicates = ({ fileInfo }, newItems) => {
  return newItems.filter(({ name }) => !!find(fileInfo, { name }));
};

const removeFile = (state, { data }) => state.fileInfo.filter(({ name }) => name !== data);

const initialState = {
  isLoaded: false,
  fileInfo: [],
  duplicates: [],
  isDuplicate: false
};

const uploadReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_VIDEO_FILE:
      return {
        isLoaded: action && Object.keys(action.data).length > 0,
        fileInfo: [...state.fileInfo, ...removeDuplicates(state, action.data)],
        duplicates: getDuplicates(state, action.data),
        isDuplicate: !isEmpty(getDuplicates(state, action.data))
      };
    case REMOVE_VIDEO_FILE:
      return {
        ...state,
        fileInfo: [...removeFile(state, action)]
      };
    case END_IS_DUPLICATE_TOAST:
      return {
        ...state,
        isDuplicate: false
      };
    default:
      return state;
  }
};

export default uploadReducer;

// action.data
//         && Object.keys(action.data).length > 0,
//         userInfo: action.userInfo
