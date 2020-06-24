/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

const VideoPreview = ({ file: { filesInfo } }) => {
  if (filesInfo.length) {
    const { path } = find(filesInfo, { isFilePreview: true });

    const encodeURI = str => encodeURIComponent(str).replace(
      /[!'()*]/g,
      c => `%${c.charCodeAt(0).toString(16)}`
    );
    const encodedPath = encodeURI(path);

    return (
      <video className="content video" controls autoPlay>
        <source
          src={`http://localhost:9192/file/${encodedPath}`}
          type="video/mp4"
        />
        <source
          src={`http://localhost:9192/file/${encodedPath}`}
          type="video/ogg"
        />
        <source
          src={`http://localhost:9192/file/${encodedPath}`}
          type="video/WebM"
        />
      </video>
    );
  }
};

VideoPreview.propTypes = {
  file: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VideoPreview;
