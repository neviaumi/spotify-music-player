export function PlayHistoryObject(attributes?: any) {
  return {
    context: {
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/7oY4n9cdzh1n1imevE68cD',
      },
      href: 'https://api.spotify.com/v1/playlists/7oY4n9cdzh1n1imevE68cD',
      type: 'playlist',
      uri: 'spotify:playlist:7oY4n9cdzh1n1imevE68cD',
    },
    played_at: '2021-03-07T09:51:53.338Z',
    track: {
      album: {
        album_type: 'album',
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
          spotify: 'https://open.spotify.com/album/3KzAvEXcqJKBF97HrXwlgf',
        },
        href: 'https://api.spotify.com/v1/albums/3KzAvEXcqJKBF97HrXwlgf',
        id: '3KzAvEXcqJKBF97HrXwlgf',
        images: [
          {
            height: 640,
            url: 'https://i.scdn.co/image/ab67616d0000b273dbeec63ad914c973e75c24df',
            width: 640,
          },
          {
            height: 300,
            url: 'https://i.scdn.co/image/ab67616d00001e02dbeec63ad914c973e75c24df',
            width: 300,
          },
          {
            height: 64,
            url: 'https://i.scdn.co/image/ab67616d00004851dbeec63ad914c973e75c24df',
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
    ...attributes,
  };
}
