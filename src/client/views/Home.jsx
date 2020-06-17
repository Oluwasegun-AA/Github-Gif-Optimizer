import React from 'react';
import { UploadInput } from '../components/index';

/**
 * @description home view functional component
 * @param {*} props props passed down from parent
 */
function Home(props) {
  return (
    <div className="container">
      <UploadInput {...props} />
    </div>
  );
}

export default Home;
