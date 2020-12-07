import { render, screen } from '@testing-library/react';

import App from '../App';

jest.unmock('../hooks/useAccessToken');

it('Should render without error', () => {
  render(<App />);
  expect(screen.getByTestId('login-empty')).toBeVisible();
});
