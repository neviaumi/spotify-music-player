import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Login from '../index';

it('Should render without error', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
  expect(getByTestId('login-empty')).toBeDefined();
});
