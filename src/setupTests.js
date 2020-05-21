// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// configure enzyme-adapter-react for test purposes
configure({
  adapter: new Adapter(),
});
