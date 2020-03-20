import { shallow } from 'enzyme';
import React from 'react';
import { Route } from 'react-router-dom';

import Routes from '../Routes';

it('Should has correct route count', () => {
  const wrapper = shallow(<Routes />);
  const routes = wrapper.find(Route);
  expect(routes).toHaveLength(4);
  const paths = routes.map(route => route.prop('path'));
  expect(new Set(paths)).toEqual(
    new Set([
      '/',
      '/auth/login',
      '/auth/login/callback',
      '/metric/performance',
    ]),
  );
});
