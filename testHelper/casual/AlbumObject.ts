import casual from 'casual';

function AlbumObjectFactory(attributes?: any) {
  return {
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
    copyrights: [
      {
        text: '© 2015 Apple Corps Ltd',
        type: 'C',
      },
      {
        text:
          '℗ 2015 Calderstone Productions Limited (a division of Universal Music Group)',
        type: 'P',
      },
    ],
    external_ids: {
      upc: '00602547670335',
    },
    external_urls: {
      spotify: 'https://open.spotify.com/album/6wCttLq0ADzkPgtRnUihLV',
    },
    genres: [],
    href: 'https://api.spotify.com/v1/albums/6wCttLq0ADzkPgtRnUihLV',
    id: '6wCttLq0ADzkPgtRnUihLV',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b273e230f303815e82a86713eedd',
        width: 640,
      },
      {
        height: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e02e230f303815e82a86713eedd',
        width: 300,
      },
      {
        height: 64,
        url: 'https://i.scdn.co/image/ab67616d00004851e230f303815e82a86713eedd',
        width: 64,
      },
    ],
    label: 'EMI Catalogue',
    name: "A Hard Day's Night (Remastered)",
    popularity: 74,
    release_date: '1964-07-10',
    release_date_precision: 'day',
    total_tracks: 13,
    tracks: {
      href:
        'https://api.spotify.com/v1/albums/6wCttLq0ADzkPgtRnUihLV/tracks?offset=0&limit=50&market=HK',
      items: [
        {
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
          disc_number: 1,
          duration_ms: 154200,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/5J2CHimS7dWYMImCHkEFaJ',
          },
          href: 'https://api.spotify.com/v1/tracks/5J2CHimS7dWYMImCHkEFaJ',
          id: '5J2CHimS7dWYMImCHkEFaJ',
          is_local: false,
          is_playable: true,
          name: "A Hard Day's Night - Remastered 2009",
          preview_url:
            'https://p.scdn.co/mp3-preview/bde00f9865951e2dd1948aff24fececc5883f111?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 1,
          type: 'track',
          uri: 'spotify:track:5J2CHimS7dWYMImCHkEFaJ',
        },
        {
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
          disc_number: 1,
          duration_ms: 163080,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/3pU1CUgPiFfxPCpscwIwQR',
          },
          href: 'https://api.spotify.com/v1/tracks/3pU1CUgPiFfxPCpscwIwQR',
          id: '3pU1CUgPiFfxPCpscwIwQR',
          is_local: false,
          is_playable: true,
          name: 'I Should Have Known Better - Remastered 2009',
          preview_url:
            'https://p.scdn.co/mp3-preview/a91e40c7965dcd154ece1eeaf6435d80b84d2a37?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 2,
          type: 'track',
          uri: 'spotify:track:3pU1CUgPiFfxPCpscwIwQR',
        },
        {
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
          disc_number: 1,
          duration_ms: 139466,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/1hgvykolO4kBIEozATmpyj',
          },
          href: 'https://api.spotify.com/v1/tracks/1hgvykolO4kBIEozATmpyj',
          id: '1hgvykolO4kBIEozATmpyj',
          is_local: false,
          is_playable: true,
          name: 'If I Fell - Remastered 2009',
          preview_url:
            'https://p.scdn.co/mp3-preview/6ed4ad19c3802ebf3ad433472fd0c0096b28ca7a?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 3,
          type: 'track',
          uri: 'spotify:track:1hgvykolO4kBIEozATmpyj',
        },
        {
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
          disc_number: 1,
          duration_ms: 116373,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/0gd50I2gKioJ59C827EdAY',
          },
          href: 'https://api.spotify.com/v1/tracks/0gd50I2gKioJ59C827EdAY',
          id: '0gd50I2gKioJ59C827EdAY',
          is_local: false,
          is_playable: true,
          name: "I'm Happy Just To Dance With You - Remastered 2009",
          preview_url:
            'https://p.scdn.co/mp3-preview/183b690863a8fedd4c6ca232828e2e4c9c96571e?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 4,
          type: 'track',
          uri: 'spotify:track:0gd50I2gKioJ59C827EdAY',
        },
        {
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
          disc_number: 1,
          duration_ms: 149693,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/65vdMBskhx3akkG9vQlSH1',
          },
          href: 'https://api.spotify.com/v1/tracks/65vdMBskhx3akkG9vQlSH1',
          id: '65vdMBskhx3akkG9vQlSH1',
          is_local: false,
          is_playable: true,
          name: 'And I Love Her - Remastered 2009',
          preview_url:
            'https://p.scdn.co/mp3-preview/d96191b7192b926c7895892d0e5c17d08f695bc6?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 5,
          type: 'track',
          uri: 'spotify:track:65vdMBskhx3akkG9vQlSH1',
        },
        {
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
          disc_number: 1,
          duration_ms: 128693,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/0Wzp5pWPoX0YoBg002HXL9',
          },
          href: 'https://api.spotify.com/v1/tracks/0Wzp5pWPoX0YoBg002HXL9',
          id: '0Wzp5pWPoX0YoBg002HXL9',
          is_local: false,
          is_playable: true,
          name: 'Tell Me Why - Remastered 2009',
          preview_url:
            'https://p.scdn.co/mp3-preview/9bd3df6773618793b73f1dc301e5ddb31eff2d7e?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 6,
          type: 'track',
          uri: 'spotify:track:0Wzp5pWPoX0YoBg002HXL9',
        },
        {
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
          disc_number: 1,
          duration_ms: 131866,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/3SdingSsFcZDZAyvcJbgAw',
          },
          href: 'https://api.spotify.com/v1/tracks/3SdingSsFcZDZAyvcJbgAw',
          id: '3SdingSsFcZDZAyvcJbgAw',
          is_local: false,
          is_playable: true,
          name: "Can't Buy Me Love - Remastered 2009",
          preview_url:
            'https://p.scdn.co/mp3-preview/809dce1d2ac85ec358f12aec9716b22fe96376ba?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 7,
          type: 'track',
          uri: 'spotify:track:3SdingSsFcZDZAyvcJbgAw',
        },
        {
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
          disc_number: 1,
          duration_ms: 131280,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/70XHAdaMaoLIOVb1hSaeJ4',
          },
          href: 'https://api.spotify.com/v1/tracks/70XHAdaMaoLIOVb1hSaeJ4',
          id: '70XHAdaMaoLIOVb1hSaeJ4',
          is_local: false,
          is_playable: true,
          name: 'Any Time At All - Remastered 2009',
          preview_url:
            'https://p.scdn.co/mp3-preview/090d1230ee630146e0f3919277f9afeaf4a5ad78?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 8,
          type: 'track',
          uri: 'spotify:track:70XHAdaMaoLIOVb1hSaeJ4',
        },
        {
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
          disc_number: 1,
          duration_ms: 105986,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/01xMiErR26kH1KCif6uEYI',
          },
          href: 'https://api.spotify.com/v1/tracks/01xMiErR26kH1KCif6uEYI',
          id: '01xMiErR26kH1KCif6uEYI',
          is_local: false,
          is_playable: true,
          name: "I'll Cry Instead - Remastered 2009",
          preview_url:
            'https://p.scdn.co/mp3-preview/ef97a97c7840809903cd3995a6f4e65dba19dad7?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 9,
          type: 'track',
          uri: 'spotify:track:01xMiErR26kH1KCif6uEYI',
        },
        {
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
          disc_number: 1,
          duration_ms: 155333,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/0voUr8lubIafUVJlauJxYF',
          },
          href: 'https://api.spotify.com/v1/tracks/0voUr8lubIafUVJlauJxYF',
          id: '0voUr8lubIafUVJlauJxYF',
          is_local: false,
          is_playable: true,
          name: 'Things We Said Today - Remastered 2009',
          preview_url:
            'https://p.scdn.co/mp3-preview/2cabd2e424ea54771504fecf392253bf6a2cbc82?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 10,
          type: 'track',
          uri: 'spotify:track:0voUr8lubIafUVJlauJxYF',
        },
        {
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
          disc_number: 1,
          duration_ms: 136640,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/4oLQ0imA5IDtNUnhFKY87q',
          },
          href: 'https://api.spotify.com/v1/tracks/4oLQ0imA5IDtNUnhFKY87q',
          id: '4oLQ0imA5IDtNUnhFKY87q',
          is_local: false,
          is_playable: true,
          name: 'When I Get Home - Remastered 2009',
          preview_url:
            'https://p.scdn.co/mp3-preview/3ace1d302d4ecdd3954474641df12b8669510c63?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 11,
          type: 'track',
          uri: 'spotify:track:4oLQ0imA5IDtNUnhFKY87q',
        },
        {
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
          disc_number: 1,
          duration_ms: 154893,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/5b9G4dtK3Tdguuy9BO3Nwo',
          },
          href: 'https://api.spotify.com/v1/tracks/5b9G4dtK3Tdguuy9BO3Nwo',
          id: '5b9G4dtK3Tdguuy9BO3Nwo',
          is_local: false,
          is_playable: true,
          name: "You Can't Do That - Remastered 2009",
          preview_url:
            'https://p.scdn.co/mp3-preview/39a917594cce49ab3e5d0a7b61125f8c2eb2447c?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 12,
          type: 'track',
          uri: 'spotify:track:5b9G4dtK3Tdguuy9BO3Nwo',
        },
        {
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
          disc_number: 1,
          duration_ms: 144186,
          explicit: false,
          external_urls: {
            spotify: 'https://open.spotify.com/track/3lSi6qfnp2YZazTzcOLBZk',
          },
          href: 'https://api.spotify.com/v1/tracks/3lSi6qfnp2YZazTzcOLBZk',
          id: '3lSi6qfnp2YZazTzcOLBZk',
          is_local: false,
          is_playable: true,
          name: "I'll Be Back - Remastered 2009",
          preview_url:
            'https://p.scdn.co/mp3-preview/10f9848face149465eb4b70d5cac591cb0ecf55b?cid=774b29d4f13844c495f206cafdad9c86',
          track_number: 13,
          type: 'track',
          uri: 'spotify:track:3lSi6qfnp2YZazTzcOLBZk',
        },
      ],
      limit: 50,
      next: null,
      offset: 0,
      previous: null,
      total: 13,
    },
    type: 'album',
    uri: 'spotify:album:6wCttLq0ADzkPgtRnUihLV',
    ...attributes,
  };
}

casual.define('AlbumObject', AlbumObjectFactory);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Casual {
    export interface Casual {
      AlbumObject: typeof AlbumObjectFactory;
    }
  }
}
