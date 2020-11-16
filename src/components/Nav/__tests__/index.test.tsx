import { render } from '@testing-library/react';
import React from 'react';

import Nav from '../';
import { TestApp } from '../../../App';

describe('Test render Nav component', () => {
  it('Should render without error', () => {
    const { getByTestId } = render(
      <TestApp
        DataFetchingConfigProviderProps={{ initialData: { data: {} } }}
        MemoryRouterProps={{ initialEntries: ['/'] }}
      >
        <Nav />
      </TestApp>,
    );
    const navHome = getByTestId('nav-home');

    expect(navHome).toBeDefined();
  });
});
