import { render } from '@testing-library/react';
import React from 'react';

import Nav from '../';
import { TestApp } from '../../../App';
import ThemeProvider from '../../../contexts/Theme';

describe('Test render Nav component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <TestApp
        AuthProviderProps={{ initialEntries: ['/'] }}
        SWRConfigProviderProps={{ initialData: { data: {} } }}
      >
        <ThemeProvider>
          <Nav />
        </ThemeProvider>
      </TestApp>,
    );
    const navHome = getByTestId('nav-home');

    expect(navHome).toBeDefined();
  });
});
