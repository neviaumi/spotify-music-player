import { render, screen } from '@testing-library/react';

import { TestApp } from '../../../App';
import { Nav } from '../';

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
