/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
const fs = require('fs');

const getOutputFilePath = (path) => {
  if (path.indexOf('.converted') > -1) {
    return isNaN(parseInt(path.split('.converted')[1], 10))
      ? `${path}1.gif`
      : `${path.split('.converted')[0]}.converted${parseInt(path.split('.converted')[1], 10) + 1}.gif`;
  } return `${path}.converted.gif`;
};

const checkFileExists = (path) => new Promise((resolve) => {
  fs.access(path, fs.F_OK, async (err) => {
    if (err) {
      return resolve(false);
    }
    return resolve(true);
  });
});

const getType = type => (type.substring(6) === 'quicktime' ? 'mov' : type.substring(6));
const getSize = size => (size / 10 ** 6).toFixed(2);
const getDuration = duration => {
  const hours = Math.floor(duration / 3600);
  duration %= 3600;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${hours}:${minutes}:${seconds}`;
};
const getName = name => {
  const trimmedName = name.substring(0, 13);
  return trimmedName === name ? `${trimmedName}${'   '}` : `${trimmedName}...`;
};

const getOptimizedProperties = (videoSize, videoType) => {
  switch (videoType) {
    case 'video/mp4':
      return {
        fps: videoSize <= 30576879 ? 6 : 3,
        biteRate: videoSize <= 30576879 ? 2000 : 1500,
        frameSize: videoSize <= 111782188 ? '800x?' : '400x?'
      };
    case 'video/quicktime' || 'video/mov':
      return {
        fps: videoSize <= 14178218 ? 10 : videoSize <= 111782188 ? 6 : 3,
        biteRate: videoSize <= 14178218 ? 3000 : videoSize <= 111782188 ? 2000 : 1500,
        frameSize: videoSize <= 14178218 ? '1080x?' : videoSize <= 111782188 ? '800x?' : '400x?'
      };
    case 'image/gif':
      return {
        fps: videoSize <= 14178218 ? 7 : videoSize <= 111782188 ? 5 : 3,
        biteRate: videoSize <= 14178218 ? 2000 : videoSize <= 111782188 ? 2000 : 1500,
        frameSize: videoSize <= 14178218 ? '800x?' : videoSize <= 111782188 ? '700x?' : '400x?'
      };
    default:
      return {
        fps: videoSize <= 111782188 ? 6 : 4,
        biteRate: videoSize <= 111782188 ? 2000 : 1500,
        frameSize: '700x?'
      };
  }
};

export {
  getType,
  getName,
  getSize,
  getDuration,
  checkFileExists,
  getOutputFilePath,
  getOptimizedProperties
};
