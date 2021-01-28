import { render, screen } from '@testing-library/react';

import { createPollyContext } from '../../../testHelper/createPollyContext';
import { TestApp } from '../../App';
import { ProtectedRoutes } from '../ProtectedRoutes';

const context = createPollyContext();
describe('ProtectedRoutes', () => {
  it('Should render Panel', async () => {
    context.polly.server.any().intercept((_req, res) => {
      res.status(200).json({});
    });
    render(
      <TestApp AuthProviderProps={{ accessToken: 'dummy' }}>
        <ProtectedRoutes />
      </TestApp>,
    );
    await expect(screen.findByTestId('panel')).resolves.toBeVisible();
  });
});
