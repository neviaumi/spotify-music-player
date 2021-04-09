import { render, screen } from '@testing-library/react';

import { createPollyContext } from '../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../testHelper/polly/setupMockServer';
import { TestApp } from '../../../App';
import { RemotePlaybackBannerWrapper } from '../';

const context = createPollyContext({
  pollyConfig: {
    mode: 'passthrough',
  },
});

describe('Test RemotePlayback Banner', () => {
  it('Should not show banner when playback type not Remote', async () => {
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player': jest
              .fn()
              .mockImplementation((_, res) => res.status(204)),
          },
        },
      },
    });
    render(
      <TestApp>
        <RemotePlaybackBannerWrapper>
          <div>Hello</div>
        </RemotePlaybackBannerWrapper>
      </TestApp>,
    );
    expect(
      screen.queryByRole('complementary', {
        name: 'remote-playback-banner',
      }),
    ).not.toBeInTheDocument();
  });

  it('Should show banner when playback type is Remote', async () => {
    setupMockServer(context.polly, {});
    render(
      <TestApp>
        <RemotePlaybackBannerWrapper>
          <div>Hello</div>
        </RemotePlaybackBannerWrapper>
      </TestApp>,
    );
    await expect(
      screen.findByRole('complementary', {
        name: 'remote-playback-banner',
      }),
    ).resolves.toBeVisible();
  });
});
