/** @jest-environment setup-polly-jest/jest-environment-jsdom */

import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { TestApp } from '../../../../../App';
import { createPollyContext } from '../../../../../utils/tests/createPollyContext';
import { LoginCallbackPage } from '../index';

const context = createPollyContext();
describe('Callback page', () => {
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
  beforeEach(() => window.localStorage.clear());

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
    const history = createMemoryHistory();
    context.polly.server.any().intercept((_req, res) => {
      res.setHeader('Access-Control-Allow-Headers', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json({});
    });
    render(
      <TestApp RouterProps={{ history }}>
        <LoginCallbackPage />
      </TestApp>,
    );
    await waitFor(() => {
      expect(history.entries).toHaveLength(1);
    });
    expect(history.entries[0].pathname).toEqual('/redirect-after-sign-token');
  });
});
