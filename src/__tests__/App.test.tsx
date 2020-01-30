import { render } from '@testing-library/react';
import React from 'react';

import App from '../App';

it('Should render without error', () => {
  // TODO: redirect to login instead of error
  expect(() => render(<App />)).toThrow('Custom Error here');
});
