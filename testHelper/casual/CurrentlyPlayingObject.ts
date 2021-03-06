import casual from 'casual';

function CurrentlyPlayingObjectFactory(attributes?: any) {
  return {
    actions: {
      disallows: {
        resuming: true,
      },
    },
    context: {
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/7oY4n9cdzh1n1imevE68cD',
      },
      href: 'https://api.spotify.com/v1/playlists/7oY4n9cdzh1n1imevE68cD',
      type: 'playlist',
      uri:
        'spotify:user:22ekb6z247ehuekkeofnzwe4y:playlist:7oY4n9cdzh1n1imevE68cD',
    },
    currently_playing_type: 'track',
    is_playing: true,
    item: {
      album: {
        album_type: 'compilation',
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
      external_ids: {
        isrc: 'GBAYE0900590',
      },
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
    progress_ms: 37652,
    timestamp: 1615040958362,
    ...attributes,
  };
}

casual.define('CurrentlyPlayingObject', CurrentlyPlayingObjectFactory);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Casual {
    export interface Casual {
      CurrentlyPlayingObject: typeof CurrentlyPlayingObjectFactory;
    }
  }
}
