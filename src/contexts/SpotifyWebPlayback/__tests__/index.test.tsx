import type { Request, Response } from '@pollyjs/core';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren } from 'react';

import { createPollyContext } from '../../../../testHelper/polly/createPollyContext';
import { TestApp } from '../../../App';
import type { TrackSimplified } from '../../../hooks/spotify/typings/Track';
import { PlayerState, useSpotifyWebPlayback } from '../';
import { player } from '../testHelpers/mockPlayer';

const context = createPollyContext();

function DummyComponents({
  track,
}: PropsWithChildren<{ track: TrackSimplified }>) {
  const {
    playerConnectState,
    pauseUserPlayback,
    playTrackOnUserPlayback,
  } = useSpotifyWebPlayback();
  if (playerConnectState === PlayerState.DISCONNECTED) return null;
  return (
    <>
      <button onClick={pauseUserPlayback}>pause</button>
      <button onClick={() => playTrackOnUserPlayback(track)}>play</button>
    </>
  );
}

describe('Test SpotifyWebPlayback', () => {
  it('.playTrackOnUserPlayback should call API', async () => {
    const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
      res.status(200);
    });
    context.polly?.server.host('https://api.spotify.com/v1', () => {
      context.polly?.server.put('me/player/play').intercept(apiHandler);
    });
    render(
      <TestApp
        SpotifyWebPlaybackProps={{
          currentState: PlayerState.CONNECTED,
          player,
        }}
      >
        <DummyComponents
          track={
            {
              uri: 'track-uri',
            } as any
          }
        />
      </TestApp>,
    );
    userEvent.click(screen.getByRole('button', { name: 'play' }));
    await waitFor(() => expect(apiHandler).toHaveBeenCalled());
    const [req]: [req: Request] = apiHandler.mock.calls[0];
    expect(req.query).toEqual({
      device_id: 'mock-player-device-id',
    });
    expect(req.body).toEqual(
      JSON.stringify({
        uris: ['track-uri'],
      }),
    );
  });

  it('.pauseUserPlayback should call API', async () => {
    const apiHandler = jest.fn().mockImplementation((_, res: Response) => {
      res.status(200);
    });
    context.polly?.server.host('https://api.spotify.com/v1', () => {
      context.polly?.server.put('me/player/pause').intercept(apiHandler);
    });
    render(
      <TestApp
        SpotifyWebPlaybackProps={{
          currentState: PlayerState.CONNECTED,
          player,
        }}
      >
        <DummyComponents
          track={
            {
              uri: 'track-uri',
            } as any
          }
        />
      </TestApp>,
    );
    userEvent.click(screen.getByRole('button', { name: 'pause' }));
    await waitFor(() => expect(apiHandler).toHaveBeenCalled());
    const [req]: [req: Request] = apiHandler.mock.calls[0];
    expect(req.query).toEqual({
      device_id: 'mock-player-device-id',
    });
  });
});
