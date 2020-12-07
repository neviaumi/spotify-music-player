import { shallow } from 'enzyme';

import theme from '../../../themes';
import ThemeProvider from '../';

describe('Test render Panel component', () => {
  it('Should render without error', () => {
    const wrapper = shallow(<ThemeProvider />);
    expect(wrapper.prop('theme')).toEqual(theme);
  });
});
