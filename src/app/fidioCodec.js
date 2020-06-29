/* eslint-disable no-await-in-loop */
import ffmpeg from 'fluent-ffmpeg';
import {
  base, evt, getType, getOutputFilePath, checkFileExists, getOptimizedProperties
} from '../common';

const getNewFilePath = async (path, type) => {
  let proposedOutputPath = getOutputFilePath(`${path.split(`.${getType(type)}`)[0]}`);
  while (await checkFileExists(proposedOutputPath)) {
    proposedOutputPath = getOutputFilePath(
      `${proposedOutputPath.split('.gif')[0]}`
    );
  }
  return proposedOutputPath;
};


// check duration of video file
const probeDuration = async (event, videos, win) => {
  Promise.all(videos.map(({
    path, name, size, type
  }) => new Promise((resolve) => ffmpeg.ffprobe(path, async (err, data) => {
    resolve({
      newPath: await getNewFilePath(path, type),
      path,
      name,
      size,
      type,
      duration: data.format.duration,
      isConverting: false,
      isConversionComplete: false,
      isFilePreview: false
    });
  })))).then(videoData => {
    base.send(evt.INFO, videoData, win);
  });
};

const startConversion = async (event, videos, win) => {
  Promise.all(videos.map(({
    path, name, size, type, newPath
  }) => {
    const { fps, biteRate, frameSize } = getOptimizedProperties(size, type);

    return new Promise(() => ffmpeg(path)
      .output(newPath)
      .withNoAudio()
      .size(frameSize)
      .withOutputFPS(fps)
      .addOption(`-b:v ${biteRate}`)
      .on('progress', ({ percent }) => {
        base.send(
          evt.PROGRESS_REPORT,
          {
            name,
            isConverting: true,
            progress: Math.floor(percent),
            isConversionComplete: false
          }, win
        );
      })
      .on('end', () => {
        base.send(
          evt.PROGRESS_REPORT,
          {
            name, newPath, isConverting: false, isConversionComplete: true
          }, win
        );
      })
      .run());
  })).then(() => {
    base.send(evt.ALL_CONVERSIONS_ENDED, true, win);
  });
};


export {
  probeDuration,
  startConversion
};
