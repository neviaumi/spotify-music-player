import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { createPollyContext } from '../../../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../../../testHelper/polly/setupMockServer';
import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from '../../../../../../testHelper/test-runner';
import { TestApp } from '../../../../../App';
import { Routes } from '../../../../index';

const context = createPollyContext(import.meta.url, {});
describe('Test /auth/login/callback', () => {
  beforeAll(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('code', 'abcd');
    url.searchParams.set('state', 'randomId');
    window.history.pushState({}, '', url);
  });

  beforeEach(() => setupMockServer(context.polly));
  it('Should redirect to page that before login', async () => {
    window.localStorage.setItem(
      'auth-session-randomId',
      JSON.stringify({
        codeVerifier: '',
        from: {
          pathname: '/redirect-after-sign-token',
        },
      }),
    );
    const history = createMemoryHistory({
      initialEntries: ['/auth/login/callback'],
    });
    render(
      <TestApp RouterProps={{ history }}>
        <Routes />
      </TestApp>,
    );
    await waitFor(() => {
      expect(history.entries[0].pathname).toEqual('/redirect-after-sign-token');
    });
  });
});
