import { shallow } from 'enzyme';

import * as themes from '../../../themes';
import { AppThemeProvider } from '../';

describe('Test render Panel component', () => {
  it('Should render without error', () => {
    const wrapper = shallow(<AppThemeProvider />);
    expect(wrapper.prop('theme')).toEqual(themes);
  });
});
