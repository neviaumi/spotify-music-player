import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import ThemeProvider from '../../../contexts/Theme';
import Home from '../';

jest.mock('../../../hooks/useAccessToken');

describe('Test render Home Page', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>,
    );
    const login = getByTestId('panel');
    expect(login).toBeDefined();
  });
});
