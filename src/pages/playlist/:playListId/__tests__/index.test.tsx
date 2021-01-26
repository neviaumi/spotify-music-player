/** @jest-environment setup-polly-jest/jest-environment-jsdom */

import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route } from 'react-router-dom';

import { TestApp } from '../../../../App';
import { createPollyContext } from '../../../../utils/tests/createPollyContext';
import { PresentPlayList, withPlayList } from '../';

describe('render PresentPlayList', () => {
  const playlist = {
    collaborative: false,
    description: 'Come together to listen to their greatest hits.',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/37i9dQZF1DXdLtD0qszB1w',
    },
    followers: {
      href: null,
      total: 2423652,
    },
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXdLtD0qszB1w',
    id: '37i9dQZF1DXdLtD0qszB1w',
    images: [
      {
        height: null,
        url: 'https://i.scdn.co/image/ab67706f00000003ed3a8bb5b72ab5ccbf5834b8',
        width: null,
      },
    ],
    name: 'This Is The Beatles',
    owner: {
      display_name: 'Spotify',
      external_urls: {
        spotify: 'https://open.spotify.com/user/spotify',
      },
      href: 'https://api.spotify.com/v1/users/spotify',
      id: 'spotify',
      type: 'user',
      uri: 'spotify:user:spotify',
    },
    primary_color: null,
    public: true,
    snapshot_id:
      'MTU2OTQxNTIzNywwMDAwMDAzMjAwMDAwMTZkNjg3MDBkYzcwMDAwMDE2ZDE1NGRhYzYz',
    tracks: {
      href:
        'https://api.spotify.com/v1/playlists/37i9dQZF1DXdLtD0qszB1w/tracks?offset=0&limit=100',
      items: [
        {
          added_at: '2019-09-15T16:27:19Z',
          added_by: {
            external_urls: {
              spotify: 'https://open.spotify.com/user/',
            },
            href: 'https://api.spotify.com/v1/users/',
            id: '',
            type: 'user',
            uri: 'spotify:user:',
          },
          is_local: false,
          primary_color: null,
          track: {
            album: {
              album_type: 'album',
              artists: [
                {
                  external_urls: {
                    spotify:
                      'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2',
                  },
                  href:
                    'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
                  id: '3WrFJ7ztbogyGnTHbHJFl2',
                  name: 'The Beatles',
                  type: 'artist',
                  uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
                },
              ],
              available_markets: [],
              external_urls: {
                spotify:
                  'https://open.spotify.com/album/2Pqkn9Dq2DFtdfkKAeqgMd',
              },
              href: 'https://api.spotify.com/v1/albums/2Pqkn9Dq2DFtdfkKAeqgMd',
              id: '2Pqkn9Dq2DFtdfkKAeqgMd',
              images: [
                {
                  height: 640,
                  url:
                    'https://i.scdn.co/image/ab67616d0000b273f7c34e39bb746d7f41bc5519',
                  width: 640,
                },
                {
                  height: 300,
                  url:
                    'https://i.scdn.co/image/ab67616d00001e02f7c34e39bb746d7f41bc5519',
                  width: 300,
                },
                {
                  height: 64,
                  url:
                    'https://i.scdn.co/image/ab67616d00004851f7c34e39bb746d7f41bc5519',
                  width: 64,
                },
              ],
              name: 'Abbey Road (Remastered)',
              release_date: '1969-09-26',
              release_date_precision: 'day',
              total_tracks: 17,
              type: 'album',
              uri: 'spotify:album:2Pqkn9Dq2DFtdfkKAeqgMd',
            },
            artists: [
              {
                external_urls: {
                  spotify:
                    'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2',
                },
                href:
                  'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
                id: '3WrFJ7ztbogyGnTHbHJFl2',
                name: 'The Beatles',
                type: 'artist',
                uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
              },
            ],
            available_markets: [],
            disc_number: 1,
            duration_ms: 185733,
            episode: false,
            explicit: false,
            external_ids: {
              isrc: 'GBAYE0601696',
            },
            external_urls: {
              spotify: 'https://open.spotify.com/track/45yEy5WJywhJ3sDI28ajTm',
            },
            href: 'https://api.spotify.com/v1/tracks/45yEy5WJywhJ3sDI28ajTm',
            id: '45yEy5WJywhJ3sDI28ajTm',
            is_local: false,
            name: 'Here Comes The Sun - Remastered',
            popularity: 1,
            preview_url: null,
            track: true,
            track_number: 7,
            type: 'track',
            uri: 'spotify:track:45yEy5WJywhJ3sDI28ajTm',
          },
          video_thumbnail: {
            url: null,
          },
        },
      ],
      limit: 100,
      next: null,
      offset: 0,
      previous: null,
      total: 1,
    },
    type: 'playlist',
    uri: 'spotify:playlist:37i9dQZF1DXdLtD0qszB1w',
  };
  it('should render heading', () => {
    render(
      <TestApp>
        <PresentPlayList playList={playlist as any} />
      </TestApp>,
    );
    expect(screen.getByTestId('heading')).toBeVisible();
    expect(screen.getByTestId('track-listing')).toBeVisible();
  });
});

describe('render withPlayList HOC', () => {
  const PlayList = withPlayList(({ playList }) => {
    return (
      <div>
        {playList?.tracks.items.map(item => (
          <button key={item.track.id}>${item.track.name}</button>
        ))}
      </div>
    );
  });
  const _context = createPollyContext();
  it('pass response to wrapper', async () => {
    const history = createMemoryHistory({
      initialEntries: ['/playlist/37i9dQZF1DXdLtD0qszB1w'],
    });
    render(
      <TestApp RouterProps={{ history }}>
        <Route component={PlayList} path="/playlist/:playListId" />
      </TestApp>,
    );
    await waitFor(() =>
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0),
    );
  });
});
