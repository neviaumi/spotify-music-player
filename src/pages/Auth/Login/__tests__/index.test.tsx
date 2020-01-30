import { render } from '@testing-library/react';
import React from 'react';

import Login from '../index';

it('Should render without error', () => {
  const { getByTestId } = render(<Login />);
  expect(getByTestId('login-empty')).toBeDefined();
});
