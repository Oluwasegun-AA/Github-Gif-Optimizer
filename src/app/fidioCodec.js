/* eslint-disable no-nested-ternary */
import ffmpeg from 'fluent-ffmpeg';
import { base, evt, getType } from '../common/index';

// check duration of video file
const probeDuration = (event, videos, win) => {
  Promise.all(videos.map(({
    path, name, size, type
  }) => new Promise((resolve) => ffmpeg.ffprobe(path, (err, { format }) => {
    resolve({
      path,
      name,
      size,
      type,
      duration: format.duration,
      isConverting: false,
      isConversionComplete: false,
      isFilePreview: false
    });
  })))).then(videoData => {
    base.send(evt.INFO, videoData, win);
  });
};

const startConversion = (event, videos, win) => {
  Promise.all(videos.map(({
    path, name, size, type
  }) => {
    const getOptions = () => {
      switch (type) {
        case 'video/mp4':
          return {
            fps: size <= 30576879 ? 6 : 3,
            biteRate: size <= 30576879 ? 2000 : 1500,
            frameSize: size <= 111782188 ? '800x?' : '400x?'
          };
        case 'video/quicktime' || 'video/mov':
          return {
            fps: size <= 14178218 ? 10 : size <= 111782188 ? 6 : 3,
            biteRate: size <= 14178218 ? 3000 : size <= 111782188 ? 2000 : 1500,
            frameSize: size <= 14178218 ? '1080x?' : size <= 111782188 ? '800x?' : '400x?'
          };
        default:
          return {
            fps: size <= 111782188 ? 6 : 4,
            biteRate: size <= 111782188 ? 2000 : 1500,
            frameSize: '700x?'
          };
      }
    };

    const { fps, biteRate, frameSize } = getOptions();

    return new Promise(() => ffmpeg(path)
      .output(`${path.split(`.${getType(type)}`)[0]}.gif`)
      .withNoAudio()
      .size(frameSize)
      .withOutputFPS(fps)
      .addOption(`-b:v ${biteRate}`)
      .on('progress', ({ percent }) => {
        base.send(
          evt.PROGRESS_REPORT,
          {
            name, isConverting: true, progress: Math.floor(percent), isConversionComplete: false
          }, win
        );
      })
      .on('end', () => {
        base.send(
          evt.PROGRESS_REPORT,
          {
            name, path: `${path.split(`.${getType(type)}`)[0]}.gif`, isConverting: false, isConversionComplete: true
          }, win
        );
      })
      .run());
  })).then(() => {
    base.send(evt.ALL_CONVERSIONS_ENDED, true, win);
  });
};

const placeHolder = () => '';

export {
  probeDuration,
  placeHolder,
  startConversion
};
