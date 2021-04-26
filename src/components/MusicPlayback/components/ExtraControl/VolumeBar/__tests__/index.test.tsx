import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PlaybackType } from '../../../../../../contexts/SpotifyWebPlayback';
import { AppThemeProvider } from '../../../../../../contexts/Theme';
import { VolumeBar } from '../';

describe('Test VolumeBar', () => {
  it('Not crash if given volume is undefined', () => {
    render(
      <AppThemeProvider>
        <VolumeBar
          currentVolume={undefined}
          isLoading={false}
          onChangeVolume={jest.fn()}
          playbackType={PlaybackType.Local}
        />
      </AppThemeProvider>,
    );
    expect(
      screen.getByRole('button', {
        name: 'volume-off.svg',
      }),
    ).toBeVisible();
  });

  it('Click button will mute sound', () => {
    const handleChangeVolume = jest.fn();
    render(
      <AppThemeProvider>
        <VolumeBar
          currentVolume={10}
          isLoading={false}
          onChangeVolume={handleChangeVolume}
          playbackType={PlaybackType.Local}
        />
      </AppThemeProvider>,
    );
    expect(
      screen.getByRole('button', {
        name: 'volume-low.svg',
      }),
    ).toBeVisible();
    userEvent.click(
      screen.getByRole('button', {
        name: 'volume-low.svg',
      }),
    );
    expect(handleChangeVolume).toHaveBeenCalledWith(0);
  });

  it('Click button with out effect if current volume is 0', () => {
    const handleChangeVolume = jest.fn();
    render(
      <AppThemeProvider>
        <VolumeBar
          currentVolume={0}
          isLoading={false}
          onChangeVolume={handleChangeVolume}
          playbackType={PlaybackType.Local}
        />
      </AppThemeProvider>,
    );
    expect(
      screen.getByRole('button', {
        name: 'volume-off.svg',
      }),
    ).toBeVisible();
    userEvent.click(
      screen.getByRole('button', {
        name: 'volume-off.svg',
      }),
    );
    expect(handleChangeVolume).not.toHaveBeenCalled();
  });
});
