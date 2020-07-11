import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Nav from '../';
import { TestSWRConfigProvider } from '../../../contexts/SWR';
import ThemeProvider from '../../../contexts/Theme';

describe('Test render Nav component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <TestSWRConfigProvider value={{ initialData: { data: {} } }}>
          <ThemeProvider>
            <Nav />
          </ThemeProvider>
        </TestSWRConfigProvider>
      </MemoryRouter>,
    );
    const navHome = getByTestId('nav-home');

    expect(navHome).toBeDefined();
  });
});
