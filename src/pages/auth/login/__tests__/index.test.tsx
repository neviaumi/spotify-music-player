import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Login } from '../';

it('Should render without error', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
  expect(screen.getByTestId('login-empty')).toBeVisible();
});
