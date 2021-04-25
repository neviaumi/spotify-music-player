import casual from 'casual';

import { createPollyContext } from '../../../../../../testHelper/polly/createPollyContext';
import { setupMockServer } from '../../../../../../testHelper/polly/setupMockServer';
import { createSpotifyAPIClientForTesting } from '../../../../../utils/createSpotifyAPIClient';
import { PlaybackState } from '../../../typings/Playback';
import { createPlaybackStateMachine } from '../../PlaybackState';
import { IdlePlaybackState } from '../index';

const context = createPollyContext({});
describe('IdlePlaybackState', () => {
  it(`.getPlaybackState will transit to ${PlaybackState.PLAY_ON_REMOTE_PLAYBACK} if currently playing track is_playing is true`, async () => {
    const currentlyPlaying = casual.CurrentlyPlayingObject({
      is_playing: true,
    });
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player/currently-playing': (_, res) => {
              res.status(200).send(currentlyPlaying);
            },
          },
        },
      },
    });
    const stateMachine = createPlaybackStateMachine(PlaybackState.IDLE);
    const apiClient = createSpotifyAPIClientForTesting();
    const state = new IdlePlaybackState({
      apiClient,
      localPlayback: {
        getVolume: jest.fn().mockResolvedValue(0.1),
      } as any,
      stateMachine,
    });
    const playbackState = await state.getPlaybackState();
    expect(stateMachine.state).toEqual(PlaybackState.PLAY_ON_REMOTE_PLAYBACK);
    expect(playbackState).toBeNull();
  });

  it(`.getPlaybackState will keep IDLE if currently playing track is_playing is false`, async () => {
    const currentlyPlaying = casual.CurrentlyPlayingObject({
      is_playing: false,
    });
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player/currently-playing': (_, res) => {
              res.status(200).send(currentlyPlaying);
            },
          },
        },
      },
    });
    const stateMachine = createPlaybackStateMachine(PlaybackState.IDLE);
    const apiClient = createSpotifyAPIClientForTesting();
    const state = new IdlePlaybackState({
      apiClient,
      localPlayback: {
        getVolume: jest.fn().mockResolvedValue(0.1),
      } as any,
      stateMachine,
    });
    const playbackState = await state.getPlaybackState();
    expect(stateMachine.state).toEqual(PlaybackState.IDLE);
    expect(playbackState).toStrictEqual({
      actions: { disallows: { resuming: true } },
      device: { id: undefined, is_active: false, volume_percent: 10 },
      is_active: false,
      is_paused: true,
      progress_ms: 0,
      repeat_state: 'off',
      shuffle_state: false,
      track: {
        album: {
          album_type: 'compilation',
          artists: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2',
              },
              href: 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
              id: '3WrFJ7ztbogyGnTHbHJFl2',
              name: 'The Beatles',
              type: 'artist',
              uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
            },
          ],
          external_urls: {
            spotify: 'https://open.spotify.com/album/6126O4XLYAfzU3961ziahP',
          },
          href: 'https://api.spotify.com/v1/albums/6126O4XLYAfzU3961ziahP',
          id: '6126O4XLYAfzU3961ziahP',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/ab67616d0000b2735ef4660298ae29ee18799fc2',
              width: 640,
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/ab67616d00001e025ef4660298ae29ee18799fc2',
              width: 300,
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/ab67616d000048515ef4660298ae29ee18799fc2',
              width: 64,
            },
          ],
          name: 'The Beatles 1962 - 1966 (Remastered)',
          release_date: '1973-04-01',
          release_date_precision: 'day',
          total_tracks: 26,
          type: 'album',
          uri: 'spotify:album:6126O4XLYAfzU3961ziahP',
        },
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2',
            },
            href: 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
            id: '3WrFJ7ztbogyGnTHbHJFl2',
            name: 'The Beatles',
            type: 'artist',
            uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
          },
        ],
        disc_number: 2,
        duration_ms: 169613,
        explicit: false,
        external_ids: { isrc: 'GBAYE0900590' },
        external_urls: {
          spotify: 'https://open.spotify.com/track/3hNUYt4dMM9RhcWmty8oKF',
        },
        href: 'https://api.spotify.com/v1/tracks/3hNUYt4dMM9RhcWmty8oKF',
        id: '3hNUYt4dMM9RhcWmty8oKF',
        is_local: false,
        is_playable: true,
        name: 'Day Tripper - Remastered 2009',
        popularity: 62,
        preview_url:
          'https://p.scdn.co/mp3-preview/e919921f2e7794015a6176d0e2cb1bcc0de91c2f?cid=774b29d4f13844c495f206cafdad9c86',
        track_number: 4,
        type: 'track',
        uri: 'spotify:track:3hNUYt4dMM9RhcWmty8oKF',
      },
    });
  });

  it(`.getPlaybackState will fallback to recently play if currently playing 204`, async () => {
    const currentlyPlaying = casual.CursorPagingObject([
      casual.PlayHistoryObject({}),
    ]);
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player/currently-playing': (_, res) => {
              res.status(204);
            },
            '/v1/me/player/recently-played': (_, res) => {
              res.status(200).json(currentlyPlaying);
            },
          },
        },
      },
    });
    const stateMachine = createPlaybackStateMachine(PlaybackState.IDLE);
    const apiClient = createSpotifyAPIClientForTesting();
    const state = new IdlePlaybackState({
      apiClient,
      localPlayback: {
        getVolume: jest.fn().mockResolvedValue(0.1),
      } as any,
      stateMachine,
    });
    const playbackState = await state.getPlaybackState();
    expect(stateMachine.state).toEqual(PlaybackState.IDLE);
    expect(playbackState).toStrictEqual({
      actions: {
        disallows: {
          pausing: true,
          peeking_next: true,
          peeking_prev: true,
          resuming: false,
          seeking: true,
          skipping_next: true,
          skipping_prev: true,
        },
      },
      device: {
        id: undefined,
        is_active: false,
        volume_percent: 10,
      },
      is_active: false,
      is_paused: true,
      progress_ms: 0,
      repeat_state: 'off',
      shuffle_state: false,
      track: {
        album: {
          album_type: 'album',
          artists: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2',
              },
              href: 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
              id: '3WrFJ7ztbogyGnTHbHJFl2',
              name: 'The Beatles',
              type: 'artist',
              uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
            },
          ],
          available_markets: ['HK'],
          external_urls: {
            spotify: 'https://open.spotify.com/album/3KzAvEXcqJKBF97HrXwlgf',
          },
          href: 'https://api.spotify.com/v1/albums/3KzAvEXcqJKBF97HrXwlgf',
          id: '3KzAvEXcqJKBF97HrXwlgf',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/ab67616d0000b273dbeec63ad914c973e75c24df',
              width: 640,
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/ab67616d00001e02dbeec63ad914c973e75c24df',
              width: 300,
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/ab67616d00004851dbeec63ad914c973e75c24df',
              width: 64,
            },
          ],
          name: 'Please Please Me (Remastered)',
          release_date: '1963-03-22',
          release_date_precision: 'day',
          total_tracks: 14,
          type: 'album',
          uri: 'spotify:album:3KzAvEXcqJKBF97HrXwlgf',
        },
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2',
            },
            href: 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
            id: '3WrFJ7ztbogyGnTHbHJFl2',
            name: 'The Beatles',
            type: 'artist',
            uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
          },
        ],
        available_markets: ['HK'],
        disc_number: 1,
        duration_ms: 120853,
        explicit: false,
        external_ids: {
          isrc: 'GBAYE0601416',
        },
        external_urls: {
          spotify: 'https://open.spotify.com/track/6EHuOufBeL6vk3TvVJB5qo',
        },
        href: 'https://api.spotify.com/v1/tracks/6EHuOufBeL6vk3TvVJB5qo',
        id: '6EHuOufBeL6vk3TvVJB5qo',
        is_local: false,
        name: 'Please Please Me - Remastered 2009',
        popularity: 60,
        preview_url:
          'https://p.scdn.co/mp3-preview/c7974d03d8cd26de7ba9d4357c0b1ba422c296c5?cid=774b29d4f13844c495f206cafdad9c86',
        track_number: 7,
        type: 'track',
        uri: 'spotify:track:6EHuOufBeL6vk3TvVJB5qo',
      },
    });
  });

  it(`.getPlaybackState will return if recently playing is podcast`, async () => {
    const currentlyPlaying = casual.CursorPagingObject([
      casual.PlayHistoryObject({
        track: {
          type: 'episode',
        },
      }),
    ]);
    setupMockServer(context.polly, {
      handlers: {
        spotifyAPI: {
          get: {
            '/v1/me/player/currently-playing': (_, res) => {
              res.status(204);
            },
            '/v1/me/player/recently-played': (_, res) => {
              res.status(200).json(currentlyPlaying);
            },
          },
        },
      },
    });
    const stateMachine = createPlaybackStateMachine(PlaybackState.IDLE);
    const apiClient = createSpotifyAPIClientForTesting();
    const state = new IdlePlaybackState({
      apiClient,
      localPlayback: {
        getVolume: jest.fn().mockResolvedValue(0.1),
      } as any,
      stateMachine,
    });
    const playbackState = await state.getPlaybackState();
    expect(stateMachine.state).toEqual(PlaybackState.IDLE);
    expect(playbackState).toBeNull();
  });
});
