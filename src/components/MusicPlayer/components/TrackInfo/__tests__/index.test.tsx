import { render, screen } from '@testing-library/react';

import { TestApp } from '../../../../../App';
import { TrackInfo } from '../';

describe('Test TrackInfo', () => {
  it('Render nothing if current playing track is undefined', () => {
    render(
      <TestApp>
        <TrackInfo currentPlayingTrack={undefined} />
      </TestApp>,
    );
    expect(screen.queryByLabelText('track-info-container')).toBeNull();
  });

  it('Render album link', () => {
    render(
      <TestApp>
        <TrackInfo
          currentPlayingTrack={
            {
              album: {
                images: [],
                name: 'dummy-album',
                uri: 'spotify:album:3KzAvEXcqJKBF97HrXwlgf',
              },
              artists: [],
              name: 'Dummy',
            } as any
          }
        />
      </TestApp>,
    );
    expect(
      screen.getByRole('link', {
        name: 'Dummy',
      }),
    ).toHaveAttribute('href', `/album/3KzAvEXcqJKBF97HrXwlgf`);
  });
});
