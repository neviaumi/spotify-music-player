import { shallow } from 'enzyme';
import React from 'react';
import { Route } from 'react-router-dom';

import Routes, { DummyComponent } from '../';

it('Should has correct route count', () => {
  const wrapper = shallow(<Routes />);
  const routes = wrapper.find(Route);
  expect(routes).toHaveLength(3);
  const paths = routes.map(route => route.prop('path'));
  expect(new Set(paths)).toEqual(
    new Set(['/auth/login', '/auth/login/callback', '/metric/performance']),
  );
});

it('Dummy Component should do nothing', () => {
  const wrapper = shallow(<DummyComponent />);
  expect(wrapper.text()).toEqual('First Content');
});
