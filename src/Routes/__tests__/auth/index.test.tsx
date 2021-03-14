import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { TestApp } from 'src/App';

import { createPollyContext } from '../../../../testHelper/polly/createPollyContext';
import { Routes } from '../../index';

createPollyContext({
  appConfig: {
    enableMockServer: true,
  },
});

describe('Test /auth/login', () => {
  it('render login page with empty content', async () => {
    render(
      <TestApp
        RouterProps={{
          history: createMemoryHistory({
            initialEntries: ['/auth/login'],
          }),
        }}
      >
        <Routes />
      </TestApp>,
    );
    await expect(screen.findByTestId('login-empty')).resolves.toBeVisible();
  });
});
