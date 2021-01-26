import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../';

it('Should render without error', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );
  expect(screen.getByTestId('login-empty')).toBeVisible();
});
