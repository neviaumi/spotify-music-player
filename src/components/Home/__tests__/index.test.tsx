import { render } from '@testing-library/react';
import React from 'react';

import Home from '../';

describe('Test render Home page', () => {
  it('Should render Home page', () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('home-component')).toBeDefined();
  });
});
