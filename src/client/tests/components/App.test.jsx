import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../App';

describe('App renders successfully', () => {
  it('renders <App/>', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
  });
});
