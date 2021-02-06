import { render, screen } from '@testing-library/react';

import { TestApp } from '../../App';
import { ProtectedRoutes } from '../ProtectedRoutes';

describe('ProtectedRoutes', () => {
  it('Should render children', async () => {
    render(
      <TestApp AuthProviderProps={{ accessToken: 'dummy' }}>
        <ProtectedRoutes>
          <div data-testid="content">HelloWorld</div>
        </ProtectedRoutes>
      </TestApp>,
    );
    await expect(screen.findByTestId('content')).resolves.toBeVisible();
  });
});
