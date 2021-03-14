import type { InterceptHandler, Request, Response } from '@pollyjs/core';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import casual from 'casual';
import type { PropsWithChildren } from 'react';

import { createPollyContext } from '../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../App';
import type { TrackSimplified } from '../../../hooks/spotify/typings/Track';
import { PlaybackState, useSpotifyWebPlayback } from '../';
import { RepeatMode } from '../states/RepeatMode';

const context = createPollyContext();

function createAPIMock(
  handlers: {
    [key: string]: undefined | InterceptHandler;
  } = {},
) {
  context.polly?.server.host('https://api.spotify.com/v1', () => {
    context.polly?.server.get('/me/player').intercept(
      handlers['me/player'] ||
        function handler(_, res) {
          res.status(200).json(casual.CurrentlyPlayingContextObject({}));
        },
    );
    context.polly?.server.put('me/player/play').intercept(
      handlers['me/player/play'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
    context.polly?.server.put('me/player/pause').intercept(
      handlers['me/player/pause'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
    context.polly?.server.put('me/player/shuffle').intercept(
      handlers['me/player/shuffle'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
    context.polly?.server.put('me/player/repeat').intercept(
      handlers['me/player/repeat'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
    context.polly?.server.post('me/player/next').intercept(
      handlers['me/player/next'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
    context.polly?.server.post('me/player/previous').intercept(
      handlers['me/player/previous'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
  });
}

function DummyComponents({
  track,
}: PropsWithChildren<{ track: TrackSimplified }>) {
  const {
    data: {
      playbackState,
      pauseUserPlayback,
      playTrackOnUserPlayback,
      togglePlayMode,
      toggleShuffleMode,
      changeRepeatMode,
      playNextTrack,
      playPreviousTrack,
    },
  } = useSpotifyWebPlayback();
  if (playbackState === PlaybackState.INIT) return null;
  return (
    <>
      <button onClick={pauseUserPlayback}>pauseUserPlayback</button>
      <button onClick={() => playTrackOnUserPlayback(track)}>
        playTrackOnUserPlayback
      </button>
      <button onClick={togglePlayMode}>togglePlayMode</button>
      <button onClick={toggleShuffleMode}>toggleShuffleMode</button>
      <button onClick={() => changeRepeatMode(RepeatMode.Off)}>
        changeRepeatMode
      </button>
      <button onClick={playNextTrack}>playNextTrack</button>
      <button onClick={playPreviousTrack}>playPreviousTrack</button>
    </>
  );
}

describe('Test SpotifyWebPlayback', () => {
  it('.changeRepeatMode should call API', async () => {
    const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
      res.status(204);
    });
    createAPIMock({
      'me/player/repeat': apiHandler,
    });

    render(
      <TestApp>
        <DummyComponents
          track={
            {
              uri: 'track-uri',
            } as any
          }
        />
      </TestApp>,
    );
    userEvent.click(
      await screen.findByRole('button', { name: 'changeRepeatMode' }),
    );
    await waitFor(() => expect(apiHandler).toHaveBeenCalled());
    const [req]: [req: Request] = apiHandler.mock.calls[0];
    expect(req.query).toEqual({
      device_id: 'mock-remote-player-device-id',
      state: RepeatMode.Off,
    });
  });

  it.each`
    currentShuffleMode
    ${true}
    ${false}
  `(
    '.toggleShuffleMode should call API with reversed of $currentShuffleMode ',
    async ({ currentShuffleMode }) => {
      const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
        res.status(204);
      });
      createAPIMock({
        'me/player': (_, res) => {
          res.status(200).json(
            casual.CurrentlyPlayingContextObject({
              shuffle_state: currentShuffleMode,
            }),
          );
        },
        'me/player/shuffle': apiHandler,
      });

      render(
        <TestApp>
          <DummyComponents
            track={
              {
                uri: 'track-uri',
              } as any
            }
          />
        </TestApp>,
      );
      userEvent.click(
        await screen.findByRole('button', { name: 'toggleShuffleMode' }),
      );
      await waitFor(() => expect(apiHandler).toHaveBeenCalled());
      const [req]: [req: Request] = apiHandler.mock.calls[0];
      expect(req.query).toEqual({
        device_id: 'mock-remote-player-device-id',
        state: currentShuffleMode ? 'false' : 'true',
      });
    },
  );

  it('.playPreviousTrack should call API', async () => {
    const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
      res.status(204);
    });
    createAPIMock({
      'me/player/previous': apiHandler,
    });

    render(
      <TestApp>
        <DummyComponents
          track={
            {
              uri: 'track-uri',
            } as any
          }
        />
      </TestApp>,
    );
    userEvent.click(
      await screen.findByRole('button', { name: 'playPreviousTrack' }),
    );
    await waitFor(() => expect(apiHandler).toHaveBeenCalled());
    const [req]: [req: Request] = apiHandler.mock.calls[0];
    expect(req.query).toEqual({
      device_id: 'mock-remote-player-device-id',
    });
  });

  it('.playNextTrack should call API', async () => {
    const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
      res.status(204);
    });
    createAPIMock({
      'me/player/next': apiHandler,
    });

    render(
      <TestApp>
        <DummyComponents
          track={
            {
              uri: 'track-uri',
            } as any
          }
        />
      </TestApp>,
    );
    userEvent.click(
      await screen.findByRole('button', { name: 'playNextTrack' }),
    );
    await waitFor(() => expect(apiHandler).toHaveBeenCalled());
    const [req]: [req: Request] = apiHandler.mock.calls[0];
    expect(req.query).toEqual({
      device_id: 'mock-remote-player-device-id',
    });
  });

  it('.pauseUserPlayback should call API', async () => {
    const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
      res.status(204);
    });
    createAPIMock({
      'me/player/pause': apiHandler,
    });

    render(
      <TestApp>
        <DummyComponents
          track={
            {
              uri: 'track-uri',
            } as any
          }
        />
      </TestApp>,
    );
    userEvent.click(
      await screen.findByRole('button', { name: 'pauseUserPlayback' }),
    );
    await waitFor(() => expect(apiHandler).toHaveBeenCalled());
    const [req]: [req: Request] = apiHandler.mock.calls[0];
    expect(req.query).toEqual({
      device_id: 'mock-remote-player-device-id',
    });
  });

  it('.playTrackOnUserPlayback should call API', async () => {
    const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
      res.status(204);
    });
    createAPIMock({
      'me/player/play': apiHandler,
    });
    render(
      <TestApp>
        <DummyComponents
          track={
            {
              uri: 'track-uri',
            } as any
          }
        />
      </TestApp>,
    );

    userEvent.click(
      await screen.findByRole('button', { name: 'playTrackOnUserPlayback' }),
    );
    await waitFor(() => expect(apiHandler).toHaveBeenCalled());
    const [req]: [req: Request] = apiHandler.mock.calls[0];
    expect(req.query).toEqual({
      device_id: 'mock-remote-player-device-id',
    });
    expect(req.body).toEqual(
      JSON.stringify({
        uris: ['track-uri'],
      }),
    );
  });

  it.each`
    isPaused | expectedCallAPI
    ${false} | ${'me/player/pause'}
    ${true}  | ${'me/player/play'}
  `(
    '.togglePlayMode should call $expectedCallAPI when device active and paused is $isPaused',
    async ({ expectedCallAPI, isPaused }) => {
      const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
        res.status(204);
      });
      createAPIMock({
        [expectedCallAPI]: apiHandler,
        'me/player': (_, res) => {
          res.status(200).json(
            casual.CurrentlyPlayingContextObject({
              is_playing: !isPaused,
            }),
          );
        },
      });

      render(
        <TestApp>
          <DummyComponents
            track={
              {
                uri: 'track-uri',
              } as any
            }
          />
        </TestApp>,
      );

      userEvent.click(
        await screen.findByRole('button', { name: 'togglePlayMode' }),
      );
      await waitFor(() => expect(apiHandler).toHaveBeenCalled());
      const [req]: [req: Request] = apiHandler.mock.calls[0];
      expect(req.query).toEqual({
        device_id: 'mock-remote-player-device-id',
      });
      expect(req.body).toEqual(null);
    },
  );

  it.each`
    case | item | expectedCallAPI | expectedBody
    ${'album available'} | ${{
  album: {
    uri: 'album:uri',
  },
  disc_number: 1,
}} | ${'me/player/play'} | ${{
  context_uri: 'album:uri',
  offset: {
    position: 1,
  },
}}
    ${'album missing'} | ${{
  uri: 'track:uri',
}} | ${'me/player/play'} | ${{ uris: ['track:uri'] }}
  `(
    '.togglePlayMode should call $expectedCallAPI when device inactive and $case',
    async ({ item, expectedCallAPI, expectedBody }) => {
      const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
        res.status(204);
      });
      createAPIMock({
        [expectedCallAPI]: apiHandler,
        'me/player': (_, res) => {
          res.status(200).json({
            ...casual.CurrentlyPlayingContextObject({
              device: {
                is_active: false,
              },
              is_playing: false,
            }),
            item,
          });
        },
      });

      render(
        <TestApp>
          <DummyComponents
            track={
              {
                uri: 'track-uri',
              } as any
            }
          />
        </TestApp>,
      );

      userEvent.click(
        await screen.findByRole('button', { name: 'togglePlayMode' }),
      );
      await waitFor(() => expect(apiHandler).toHaveBeenCalled());
      const [req]: [req: Request] = apiHandler.mock.calls[0];
      expect(req.query).toEqual({
        device_id: 'mock-local-player-device-id',
      });
      expect(req.body).toEqual(JSON.stringify(expectedBody));
    },
  );
});
