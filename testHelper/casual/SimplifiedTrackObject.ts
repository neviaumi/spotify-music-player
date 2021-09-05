import casual from 'casual';

function SimplifiedTrackObjectFactory(attributes?: any) {
  return {
    album: {
      album_type: 'ALBUM',
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
      external_urls: {
        spotify: 'https://open.spotify.com/album/1klALx0u4AavZNEvC4LrTL',
      },
      href: 'https://api.spotify.com/v1/albums/1klALx0u4AavZNEvC4LrTL',
      id: '1klALx0u4AavZNEvC4LrTL',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2734ce8b4e42588bf18182a1ad2',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e024ce8b4e42588bf18182a1ad2',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d000048514ce8b4e42588bf18182a1ad2',
          width: 64,
        },
      ],
      name: 'The Beatles (Remastered)',
      release_date: '1968-11-22',
      release_date_precision: 'day',
      total_tracks: 30,
      type: 'album',
      uri: 'spotify:album:1klALx0u4AavZNEvC4LrTL',
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
    duration_ms: 163453,
    explicit: false,
    external_ids: {
      isrc: 'GBAYE0601644',
    },
    external_urls: {
      spotify: 'https://open.spotify.com/track/0j3p1p06deJ7f9xmJ9yG22',
    },
    href: 'https://api.spotify.com/v1/tracks/0j3p1p06deJ7f9xmJ9yG22',
    id: '0j3p1p06deJ7f9xmJ9yG22',
    is_local: false,
    name: 'Back In The U.S.S.R. - Remastered 2009',
    popularity: 66,
    preview_url: null,
    track_number: 1,
    type: 'track',
    uri: 'spotify:track:0j3p1p06deJ7f9xmJ9yG22',
    ...attributes,
  };
}

casual.define('SimplifiedTrackObject', SimplifiedTrackObjectFactory);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Casual {
    export interface Casual {
      SimplifiedTrackObject: typeof SimplifiedTrackObjectFactory;
    }
  }
}
