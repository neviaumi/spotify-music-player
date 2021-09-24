import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { createPollyContext } from '../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../testHelper/polly/setupMockServer';
import {
  beforeEach,
  describe,
  expect,
  it,
} from '../../../../testHelper/test-runner';
import { TestApp } from '../../../App';
import { Routes } from '../../index';

const context = createPollyContext(import.meta.url, {});

describe('Test /auth/login', () => {
  beforeEach(() => setupMockServer(context.polly));

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
