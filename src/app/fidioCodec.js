import ffmpeg from 'fluent-ffmpeg';
import { base, evt } from '../common/index';

// check duration of video file
const probeDuration = (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    base.send(evt.INFO, metadata.format.duration);
  });
};

export {
  probeDuration
};
