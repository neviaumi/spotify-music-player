import { render } from '@testing-library/react';
import React from 'react';

import App from '../App';

jest.unmock('../hooks/useAccessToken');

it('Should render without error', () => {
  const { getByTestId } = render(<App />);
  const login = getByTestId('login-empty');
  expect(login).toBeDefined();
});
