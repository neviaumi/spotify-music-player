import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TestApp } from '../../../App';
import { player } from '../../../contexts/SpotifyWebPlayback/testHelpers/mockPlayer';
import { TracksList } from '../index';

describe('Test TracksList', () => {
  it('Include index column', () => {
    render(
      <TestApp>
        <TracksList
          columns={[]}
          getTrackId={jest.fn()}
          onPausePlayingTrack={jest.fn()}
          onSelectTrackToPlay={jest.fn()}
        />
      </TestApp>,
    );
    expect(screen.getAllByRole('columnheader')).toHaveLength(1);
  });

  it('click item will pause if playing track clicked in list', async () => {
    const trackId = 'demoTrackId';
    const pausePlayingTrack = jest.fn();
    render(
      <TestApp
        SpotifyWebPlaybackProps={{
          currentTrack: {
            id: trackId,
            name: 'demoTrack',
          } as any,
          player: player,
        }}
      >
        <TracksList
          columns={[]}
          getTrackId={track => track.id}
          onPausePlayingTrack={pausePlayingTrack}
          onSelectTrackToPlay={jest.fn()}
          tracks={
            {
              items: [
                {
                  id: trackId,
                },
              ],
            } as any
          }
        />
      </TestApp>,
    );
    expect(screen.getByRole('img', { name: 'streaming' })).toBeVisible();
    userEvent.dblClick(screen.getByRole('listitem', { name: 'track-item-0' }));
    expect(pausePlayingTrack).toHaveBeenCalled();
  });

  it('change playing track if clicked track is not playing track', async () => {
    const trackId = 'demoTrackId';
    const selectTrackToPlay = jest.fn();
    render(
      <TestApp>
        <TracksList
          columns={[]}
          getTrackId={track => track.id}
          onPausePlayingTrack={jest.fn()}
          onSelectTrackToPlay={selectTrackToPlay}
          tracks={
            {
              items: [
                {
                  id: trackId,
                },
              ],
            } as any
          }
        />
      </TestApp>,
    );
    userEvent.dblClick(screen.getByRole('listitem', { name: 'track-item-0' }));
    expect(selectTrackToPlay).toHaveBeenCalled();
  });
});
