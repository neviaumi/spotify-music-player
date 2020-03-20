import { shallow } from 'enzyme';
import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthCallback from '../index';

it('Should render without error', () => {
  const wrapper = shallow(<AuthCallback />);
  const redirect = wrapper.find(Redirect).first();
  expect(redirect).toBeDefined();
  expect(redirect.prop('to')).toEqual('/playlist/foobar');
});
