import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import casual from 'casual';

import { createPollyContext } from '../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../App';
import { TracksList } from '../index';

const currentPlaying = casual.CurrentlyPlayingContextObject();
createPollyContext({
  appConfig: {
    enableMockServer: true,
    mockRouteHandlers: {
      '/me/player': (_, res) => {
        res.status(200).json(currentPlaying);
      },
    },
  },
  pollyConfig: {
    mode: 'passthrough',
  },
});

describe('Test TracksList', () => {
  it('Include index column', async () => {
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
    await expect(screen.findAllByRole('columnheader')).resolves.toHaveLength(1);
  });

  it('click item will pause if playing track clicked in list', async () => {
    const trackId = currentPlaying.item.id;
    const pausePlayingTrack = jest.fn();
    render(
      <TestApp>
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

    await expect(
      screen.findByRole('img', { name: 'streaming' }),
    ).resolves.toBeVisible();
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

    userEvent.dblClick(
      await screen.findByRole('listitem', { name: 'track-item-0' }),
    );
    expect(selectTrackToPlay).toHaveBeenCalled();
  });
});
