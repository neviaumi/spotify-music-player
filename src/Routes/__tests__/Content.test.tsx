import { shallow } from 'enzyme';
import React from 'react';
import { Route } from 'react-router-dom';

import ContentRoutes, { ContentSwitch } from '../Content';

it('Should render ContentSwitch in right side', () => {
  const wrapper = shallow(<ContentRoutes />);
  const panel = wrapper.find({ 'data-testid': 'panel' }).first();
  const panelRight = panel.prop('Right');
  expect(panelRight.type.name).toEqual(ContentSwitch.name);
});

it('ContentSwitch should contain 2 routes', () => {
  const wrapper = shallow(<ContentSwitch />);
  const routes = wrapper.find(Route);
  expect(routes).toHaveLength(2);
});
