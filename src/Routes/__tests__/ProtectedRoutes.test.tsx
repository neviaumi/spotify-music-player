/** @jest-environment setup-polly-jest/jest-environment-jsdom */
import { render, screen } from '@testing-library/react';

import { TestApp } from '../../App';
import { createPollyContext } from '../../utils/tests/createPollyContext';
import { ProtectedRoutes } from '../ProtectedRoutes';

const context = createPollyContext();
describe('ProtectedRoutes', () => {
  it('Should render Panel', async () => {
    context.polly.server.any().intercept((_req, res) => {
      res.status(200).json({});
    });
    render(
      <TestApp>
        <ProtectedRoutes />
      </TestApp>,
    );
    await expect(screen.findByTestId('panel')).resolves.toBeVisible();
  });
});
