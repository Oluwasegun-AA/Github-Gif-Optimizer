import ffmpeg from 'fluent-ffmpeg';
import { base, evt } from '../common/index';

// check duration of video file
const probeDuration = (event, videos) => {
  Promise.all(videos.map(({
    path, name, size, type
  }) => new Promise((resolve) => ffmpeg.ffprobe(path, (err, { format }) => {
    resolve({
      path, name, size, type, duration: format.duration
    });
  })))).then(videoData => {
    base.send(evt.INFO, videoData);
  });
};

const placeHolder = () => '';

export {
  probeDuration,
  placeHolder
};
