import casual from 'casual';

const WebPlaybackStateFactory = (attributes?: any) => {
  return {
    context: {
      metadata: {
        context_description: 'Guitar practices',
      },
      uri: 'spotify:playlist:7oY4n9cdzh1n1imevE68cD',
    },
    disallows: {
      resuming: true,
    },
    duration: 155274,
    paused: false,
    playback_quality: 'VERY_HIGH',
    position: 141034,
    repeat_mode: 1,
    restrictions: {
      disallow_resuming_reasons: ['not_paused'],
    },
    shuffle: true,
    timestamp: 1614527382473,
    track_window: {
      current_track: {
        album: {
          images: [
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
            {
              height: 640,
              url:
                'https://i.scdn.co/image/ab67616d0000b273dbeec63ad914c973e75c24df',
              width: 640,
            },
          ],
          name: 'Please Please Me (Remastered)',
          uri: 'spotify:album:3KzAvEXcqJKBF97HrXwlgf',
        },
        artists: [
          {
            name: 'The Beatles',
            uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
          },
        ],
        duration_ms: 155274,
        id: '5ZBeML7Lf3FMEVviTyvi8l',
        is_playable: true,
        linked_from: {
          id: null,
          uri: null,
        },
        media_type: 'audio',
        name: 'Twist And Shout - Remastered 2009',
        track_type: 'audio',
        type: 'track',
        uid: '9bedbc42d8d82817',
        uri: 'spotify:track:5ZBeML7Lf3FMEVviTyvi8l',
      },
      next_tracks: [
        {
          album: {
            images: [
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
              {
                height: 640,
                url:
                  'https://i.scdn.co/image/ab67616d0000b273dbeec63ad914c973e75c24df',
                width: 640,
              },
            ],
            name: 'Please Please Me (Remastered)',
            uri: 'spotify:album:3KzAvEXcqJKBF97HrXwlgf',
          },
          artists: [
            {
              name: 'The Beatles',
              uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
            },
          ],
          duration_ms: 120853,
          id: '6EHuOufBeL6vk3TvVJB5qo',
          is_playable: true,
          linked_from: {
            id: null,
            uri: null,
          },
          media_type: 'audio',
          name: 'Please Please Me - Remastered 2009',
          track_type: 'audio',
          type: 'track',
          uid: '7fffa6ee08d706c9',
          uri: 'spotify:track:6EHuOufBeL6vk3TvVJB5qo',
        },
        {
          album: {
            images: [
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
              {
                height: 640,
                url:
                  'https://i.scdn.co/image/ab67616d0000b273e230f303815e82a86713eedd',
                width: 640,
              },
            ],
            name: "A Hard Day's Night (Remastered)",
            uri: 'spotify:album:6wCttLq0ADzkPgtRnUihLV',
          },
          artists: [
            {
              name: 'The Beatles',
              uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
            },
          ],
          duration_ms: 154200,
          id: '5J2CHimS7dWYMImCHkEFaJ',
          is_playable: true,
          linked_from: {
            id: null,
            uri: null,
          },
          media_type: 'audio',
          name: "A Hard Day's Night - Remastered 2009",
          track_type: 'audio',
          type: 'track',
          uid: 'f6f7bd9fa40011cf',
          uri: 'spotify:track:5J2CHimS7dWYMImCHkEFaJ',
        },
      ],
      previous_tracks: [
        {
          album: {
            images: [
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
              {
                height: 640,
                url:
                  'https://i.scdn.co/image/ab67616d0000b273dbeec63ad914c973e75c24df',
                width: 640,
              },
            ],
            name: 'Please Please Me (Remastered)',
            uri: 'spotify:album:3KzAvEXcqJKBF97HrXwlgf',
          },
          artists: [
            {
              name: 'The Beatles',
              uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
            },
          ],
          duration_ms: 141693,
          id: '3VbGCXWRiouAq8VyMYN2MI',
          is_playable: true,
          linked_from: {
            id: null,
            uri: null,
          },
          media_type: 'audio',
          name: 'Love Me Do - Remastered 2009',
          track_type: 'audio',
          type: 'track',
          uid: '493d302e1812f618',
          uri: 'spotify:track:3VbGCXWRiouAq8VyMYN2MI',
        },
        {
          album: {
            images: [
              {
                height: 300,
                url:
                  'https://i.scdn.co/image/ab67616d00001e02582d56ce20fe0146ffa0e5cf',
                width: 300,
              },
              {
                height: 64,
                url:
                  'https://i.scdn.co/image/ab67616d00004851582d56ce20fe0146ffa0e5cf',
                width: 64,
              },
              {
                height: 640,
                url:
                  'https://i.scdn.co/image/ab67616d0000b273582d56ce20fe0146ffa0e5cf',
                width: 640,
              },
            ],
            name: '1 (Remastered)',
            uri: 'spotify:album:7vEJAtP3KgKSpOHVgwm3Eh',
          },
          artists: [
            {
              name: 'The Beatles',
              uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
            },
          ],
          duration_ms: 145746,
          id: '4pbG9SUmWIvsROVLF0zF9s',
          is_playable: true,
          linked_from: {
            id: null,
            uri: null,
          },
          media_type: 'audio',
          name: 'I Want To Hold Your Hand - Remastered 2015',
          track_type: 'audio',
          type: 'track',
          uid: '74f5bfee30f52c0b',
          uri: 'spotify:track:4pbG9SUmWIvsROVLF0zF9s',
        },
      ],
    },
    ...(attributes || {}),
  };
};

casual.define('WebPlaybackState', WebPlaybackStateFactory);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Casual {
    export interface Casual {
      WebPlaybackState: typeof WebPlaybackStateFactory;
    }
  }
}
