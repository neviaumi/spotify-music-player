import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { createPollyContext } from '../../../../testHelper/polly/createPollyContext';
import { describe, expect, it } from '../../../../testHelper/test-runner';
import { TestApp } from '../../../App';
import { Routes } from '../../index';

createPollyContext({
  appConfig: {
    enableMockServer: true,
  },
});

describe('Test /', () => {
  it('render home page', async () => {
    render(
      <TestApp
        AuthProviderProps={{
          accessToken: 'fakeAccessToken',
        }}
        RouterProps={{
          history: createMemoryHistory({
            initialEntries: ['/'],
          }),
        }}
      >
        <Routes />
      </TestApp>,
    );
    await expect(
      screen.findByTestId('featured-play-list'),
    ).resolves.toBeVisible();
    await expect(
      screen.findByTestId('suggested-album-by-last-played-artists'),
    ).resolves.toBeVisible();
    await expect(
      screen.findByTestId('suggested-album-by-last-played-tracks'),
    ).resolves.toBeVisible();
    await expect(
      screen.findByTestId('suggested-album-by-user-top-artists-genres'),
    ).resolves.toBeVisible();
    await expect(
      screen.findByTestId('suggested-album-by-user-top-artists'),
    ).resolves.toBeVisible();
    await expect(
      screen.findByTestId('suggested-album-by-user-top-tracks'),
    ).resolves.toBeVisible();
  });
});
