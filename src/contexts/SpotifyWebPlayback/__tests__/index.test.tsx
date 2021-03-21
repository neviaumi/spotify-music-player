import type { Request, Response } from '@pollyjs/core';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import casual from 'casual';
import type { PropsWithChildren } from 'react';

import { createPollyContext } from '../../../../testHelper/polly/createPollyContext';
import {
  MockHandlers,
  setupMockServer,
} from '../../../../testHelper/polly/setupMockServer';
import { TestApp } from '../../../App';
import type { TrackSimplified } from '../../../hooks/spotify/typings/Track';
import { PlaybackState, useSpotifyWebPlayback } from '../';
import { RepeatMode } from '../states/RepeatMode';

const context = createPollyContext({});

function createAPIMock(handlers?: MockHandlers) {
  setupMockServer(context.polly, {
    handlers: {
      spotifyAPI: handlers,
    },
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
      seekTrack,
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
      <button onClick={() => seekTrack(0)}>seekTrack</button>
    </>
  );
}

describe('Test SpotifyWebPlayback', () => {
  it('.changeRepeatMode should call API', async () => {
    const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
      res.status(204);
    });
    createAPIMock({
      put: {
        '/v1/me/player/repeat': apiHandler,
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
        get: {
          '/v1/me/player': (_, res) => {
            res.status(200).json(
              casual.CurrentlyPlayingContextObject({
                shuffle_state: currentShuffleMode,
              }),
            );
          },
        },
        put: {
          '/v1/me/player/shuffle': apiHandler,
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

  it('.playPreviousTrack should seek to beginning of track', async () => {
    const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
      res.status(204);
    });
    createAPIMock({
      get: {
        '/v1/me/player': (_, res) => {
          res.status(200).json(
            casual.CurrentlyPlayingContextObject({
              progress_ms: 1000,
            }),
          );
        },
      },
      put: {
        '/v1/me/player/seek': apiHandler,
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
      await screen.findByRole('button', { name: 'playPreviousTrack' }),
    );
    await waitFor(() => expect(apiHandler).toHaveBeenCalled());
    const [req]: [req: Request] = apiHandler.mock.calls[0];
    expect(req.query).toEqual({
      device_id: 'mock-remote-player-device-id',
      position_ms: '0',
    });
  });

  it('.playPreviousTrack should call API', async () => {
    const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
      res.status(204);
    });
    createAPIMock({
      get: {
        '/v1/me/player': (_, res) => {
          res.status(200).json(
            casual.CurrentlyPlayingContextObject({
              progress_ms: 0,
            }),
          );
        },
      },
      post: {
        '/v1/me/player/previous': apiHandler,
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
      post: {
        '/v1/me/player/next': apiHandler,
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
      put: {
        '/v1/me/player/pause': apiHandler,
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
      put: {
        '/v1/me/player/play': apiHandler,
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
    ${false} | ${'/v1/me/player/pause'}
    ${true}  | ${'/v1/me/player/play'}
  `(
    '.togglePlayMode should call $expectedCallAPI when device active and paused is $isPaused',
    async ({ expectedCallAPI, isPaused }) => {
      const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
        res.status(204);
      });
      createAPIMock({
        get: {
          '/v1/me/player': (_, res) => {
            res.status(200).json(
              casual.CurrentlyPlayingContextObject({
                is_playing: !isPaused,
              }),
            );
          },
        },
        put: {
          [expectedCallAPI]: apiHandler,
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
}} | ${'/v1/me/player/play'} | ${{
  context_uri: 'album:uri',
  offset: {
    position: 1,
  },
}}
    ${'album missing'} | ${{
  uri: 'track:uri',
}} | ${'/v1/me/player/play'} | ${{ uris: ['track:uri'] }}
  `(
    '.togglePlayMode should call $expectedCallAPI when device inactive and $case',
    async ({ item, expectedCallAPI, expectedBody }) => {
      const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
        res.status(204);
      });
      createAPIMock({
        get: {
          '/v1/me/player': (_, res) => {
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
        },
        put: {
          [expectedCallAPI]: apiHandler,
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
