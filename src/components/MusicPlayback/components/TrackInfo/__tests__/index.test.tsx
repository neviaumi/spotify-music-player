import { render, screen } from '@testing-library/react';
import casual from 'casual';

import { createPollyContext } from '../../../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../../../testHelper/polly/setupMockServer';
import { TestApp } from '../../../../../App';
import { TrackInfo } from '../';

const context = createPollyContext({});

describe('Test TrackInfo', () => {
  it('Render nothing if current playing track is undefined', () => {
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
        <TrackInfo />
      </TestApp>,
    );
    expect(screen.queryByLabelText('track-info-container')).toBeNull();
  });

  it('Render album link', async () => {
    const track = casual.CurrentlyPlayingContextObject({
      item: {
        album: {
          images: [],
          name: 'dummy-album',
          uri: 'spotify:album:3KzAvEXcqJKBF97HrXwlgf',
        },
        artists: [],
        name: 'Dummy',
      } as any,
    });
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player': jest
              .fn()
              .mockImplementation((_, res) => res.status(200).json(track)),
          },
        },
      },
    });
    render(
      <TestApp>
        <TrackInfo />
      </TestApp>,
    );
    await expect(
      screen.findByRole('link', {
        name: 'Dummy',
      }),
    ).resolves.toHaveAttribute('href', `/album/3KzAvEXcqJKBF97HrXwlgf`);
  });
});
