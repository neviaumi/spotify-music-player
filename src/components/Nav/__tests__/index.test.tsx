import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Nav from '../';
import ThemeProvider from '../../../contexts/Theme';

describe('Test render Nav component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>
          <Nav />
        </ThemeProvider>
      </MemoryRouter>,
    );
    const navHome = getByTestId('nav-home');

    expect(navHome).toBeDefined();
  });
});
