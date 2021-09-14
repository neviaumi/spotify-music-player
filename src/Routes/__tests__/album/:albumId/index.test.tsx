import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../../App';
import { Routes } from '../../../index';

createPollyContext({
  appConfig: {
    enableMockServer: true,
  },
});

describe('Test album/:albumId', () => {
  it('render album', async () => {
    render(
      <TestApp
        AuthProviderProps={{
          accessToken: 'fakeAccessToken',
        }}
        RouterProps={{
          history: createMemoryHistory({
            initialEntries: ['/album/album-id'],
          }),
        }}
      >
        <Routes />
      </TestApp>,
    );
    await expect(screen.findByTestId('/album/:albumId')).resolves.toBeVisible();
  });
});
