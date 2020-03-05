import { shallow } from 'enzyme';
import React from 'react';

import ThemeProvider from '../';
import theme from '../../../themes';

describe('Test render Panel component', () => {
  it('Should render without error', () => {
    const wrapper = shallow(<ThemeProvider />);
    expect(wrapper.prop('theme')).toEqual(theme);
  });
});
