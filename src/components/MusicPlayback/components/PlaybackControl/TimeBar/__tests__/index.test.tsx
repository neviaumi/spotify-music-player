import { render, screen } from '@testing-library/react';

import { PlaybackType } from '../../../../../../contexts/SpotifyWebPlayback/';
import { AppThemeProvider } from '../../../../../../contexts/Theme';
import { TimeBar } from '../index';

describe('Test TimeBar components', () => {
  it('will not crash with default value if duration missing', async () => {
    render(
      <AppThemeProvider>
        <TimeBar
          currentProgressMS={30000}
          disallowSeeking={false}
          isLoading={false}
          onChangeTrackPlayingPosition={jest.fn()}
          playbackType={PlaybackType.Local}
        />
      </AppThemeProvider>,
    );
    await expect(
      screen.findByRole('timer', {
        name: 'current-time',
      }),
    ).resolves.toHaveTextContent('00:00');
    await expect(
      screen.findByRole('timer', {
        name: 'duration',
      }),
    ).resolves.toHaveTextContent('--:--');
  });
  it('With the range control', async () => {
    render(
      <AppThemeProvider>
        <TimeBar
          currentProgressMS={0}
          disallowSeeking={false}
          isLoading={false}
          onChangeTrackPlayingPosition={jest.fn()}
          playbackType={PlaybackType.Local}
          trackDuration={300000} // 5 minutes
        />
      </AppThemeProvider>,
    );
    await expect(
      screen.findByRole('timer', {
        name: 'current-time',
      }),
    ).resolves.toHaveTextContent('00:00');
    await expect(
      screen.findByRole('timer', {
        name: 'duration',
      }),
    ).resolves.toHaveTextContent('05:00');
  });
});
