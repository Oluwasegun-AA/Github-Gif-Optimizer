import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uploadFile from '../actions/index';

/**
 * @description home view functional component
 * @param {*} props props passed down from parent
 */
function Home(props) {
  const [info, setInfo] = useState('');

  const handleSelect = e => {
    const { path } = e.target.files[0];
    const { load } = props;
    load(path);
  };

  const getInfo = () => {
    const {
      file: { fileInfo },
    } = props;
    setInfo(`This file has a duration of ${fileInfo}`);
  };

  return (
    <div>
      <div className="top" />
      <div className="content">
        <h1 className="title">Fidio</h1>
        <input
          className="file"
          onChange={handleSelect}
          type="file"
          accept="video/*"
          id="ii"
        />
        <button type="button" id="info" onClick={getInfo}>
          Get Info
        </button>
        <h1 id="display">{info}</h1>
      </div>
      <div className="footer" />
    </div>
  );
}

const mapStateToProps = state => ({
  file: state.file,
});

const mapDispatchToProps = {
  load: uploadFile,
};

Home.propTypes = {
  load: PropTypes.func.isRequired,
  file: PropTypes.any.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

// reactDropZone
