import ffmpeg from 'fluent-ffmpeg';
import { base, evt } from '../common/index';

const probeDuration = (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    base.send(evt.INFO, metadata.format.duration);
  });
};

export { probeDuration };
