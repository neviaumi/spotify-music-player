import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { describe, expect, it } from '../../../../../testHelper/test-runner';
import { TestApp } from '../../../../App';
import { Routes } from '../../../index';

createPollyContext({
  appConfig: {
    enableMockServer: true,
  },
});

describe('Test playlist/:playlistId', () => {
  it('render playlist', async () => {
    render(
      <TestApp
        AuthProviderProps={{
          accessToken: 'fakeAccessToken',
        }}
        RouterProps={{
          history: createMemoryHistory({
            initialEntries: ['/playlist/playlist-id'],
          }),
        }}
      >
        <Routes />
      </TestApp>,
    );
    await expect(
      screen.findByTestId('/playlist/:playlistId'),
    ).resolves.toBeVisible();
  });
});
