import { render } from '@testing-library/react';
import React from 'react';

import Home from '../';
import ThemeProvider from '../../../contexts/Theme';

describe('Test render Home page', () => {
  it('Should render Home page', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>,
    );
    expect(getByTestId('home-component')).toBeDefined();
  });
});
