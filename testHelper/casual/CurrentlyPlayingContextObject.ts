import casual from 'casual';
import { mergeDeepRight } from 'ramda';

const CurrentlyPlayingContextObjectFactory = (attributes?: any) => {
  return mergeDeepRight(
    {
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
        uri: 'spotify:playlist:7oY4n9cdzh1n1imevE68cD',
      },
      currently_playing_type: 'track',
      device: {
        id: 'mock-remote-player-device-id',
        is_active: true,
        is_private_session: false,
        is_restricted: false,
        name: 'Web Player (Chrome)',
        type: 'Computer',
        volume_percent: 65,
      },
      is_playing: true,
      item: {
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
          external_urls: {
            spotify: 'https://open.spotify.com/album/6wCttLq0ADzkPgtRnUihLV',
          },
          href: 'https://api.spotify.com/v1/albums/6wCttLq0ADzkPgtRnUihLV',
          id: '6wCttLq0ADzkPgtRnUihLV',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/ab67616d0000b273e230f303815e82a86713eedd',
              width: 640,
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/ab67616d00001e02e230f303815e82a86713eedd',
              width: 300,
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/ab67616d00004851e230f303815e82a86713eedd',
              width: 64,
            },
          ],
          name: "A Hard Day's Night (Remastered)",
          release_date: '1964-07-10',
          release_date_precision: 'day',
          total_tracks: 13,
          type: 'album',
          uri: 'spotify:album:6wCttLq0ADzkPgtRnUihLV',
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
        disc_number: 1,
        duration_ms: 154200,
        explicit: false,
        external_ids: {
          isrc: 'GBAYE0601438',
        },
        external_urls: {
          spotify: 'https://open.spotify.com/track/5J2CHimS7dWYMImCHkEFaJ',
        },
        href: 'https://api.spotify.com/v1/tracks/5J2CHimS7dWYMImCHkEFaJ',
        id: '5J2CHimS7dWYMImCHkEFaJ',
        is_local: false,
        is_playable: true,
        name: "A Hard Day's Night - Remastered 2009",
        popularity: 66,
        preview_url:
          'https://p.scdn.co/mp3-preview/bde00f9865951e2dd1948aff24fececc5883f111?cid=774b29d4f13844c495f206cafdad9c86',
        track_number: 1,
        type: 'track',
        uri: 'spotify:track:5J2CHimS7dWYMImCHkEFaJ',
      },
      progress_ms: 105553,
      repeat_state: 'context',
      shuffle_state: true,
      timestamp: 1614525291925,
    },
    attributes || {},
  );
};

casual.define(
  'CurrentlyPlayingContextObject',
  CurrentlyPlayingContextObjectFactory,
);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Casual {
    export interface Casual {
      CurrentlyPlayingContextObject: typeof CurrentlyPlayingContextObjectFactory;
    }
  }
}
