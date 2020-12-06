import { render, screen } from '@testing-library/react';
import React from 'react';

import Nav from '../';
import { TestApp } from '../../../App';

describe('Test render Nav component', () => {
  it('Should render without error', () => {
    render(
      <TestApp DataFetchingConfigProviderProps={{ initialData: { data: {} } }}>
        <Nav />
      </TestApp>,
    );

    expect(screen.getByTestId('nav-home')).toBeVisible();
  });
});
