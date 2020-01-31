import { render } from '@testing-library/react';
import React from 'react';

import App from '../App';

it('Should render without error', () => {
  const { getByTestId } = render(<App />);
  const login = getByTestId('login-empty');
  expect(login).toBeDefined();
});
