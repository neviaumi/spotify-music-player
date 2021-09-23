import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { createPollyContext } from '../../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../../testHelper/polly/setupMockServer';
import {
  beforeEach,
  describe,
  expect,
  it,
} from '../../../../../testHelper/test-runner';
import { TestApp } from '../../../../App';
import { Routes } from '../../../index';

const context = createPollyContext(import.meta.url, {});

describe('Test album/:albumId', () => {
  beforeEach(() => setupMockServer(context.polly));

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
