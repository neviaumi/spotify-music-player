import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { createPollyContext } from '../../../../../../testHelper/polly/createPollyContext';
import {
  beforeAll,
  describe,
  expect,
  it,
} from '../../../../../../testHelper/test-runner';
import { TestApp } from '../../../../../App';
import { Routes } from '../../../../index';

createPollyContext({
  appConfig: {
    enableMockServer: true,
  },
});
describe('Test /auth/login/callback', () => {
  beforeAll(() => {
    const orgWindowLocation = window.location;
    // @ts-expect-error
    delete window.location;
    Object.assign(window, {
      location: {
        ...orgWindowLocation,
        href: 'http://localshot/auth/login/callback?code=abcd&state=randomId',
      },
    });
  });

  it('Should redirect to page that before login', async () => {
    window.localStorage.setItem(
      'randomId',
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
