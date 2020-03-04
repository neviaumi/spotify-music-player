import { render } from '@testing-library/react';
import React from 'react';

import Home from '../';

jest.mock('../../../hooks/useAccessToken');

describe('Test render Home Page', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(<Home />);
    const login = getByTestId('panel');
    expect(login).toBeDefined();
  });
});
