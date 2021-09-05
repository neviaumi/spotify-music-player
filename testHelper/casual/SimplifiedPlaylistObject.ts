import casual from 'casual';

function SimplifiedPlaylistObjectFactory(attributes?: any) {
  return {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/1bTZ1OTnP2JP4TM2nNpcqp',
    },
    href: 'https://api.spotify.com/v1/playlists/1bTZ1OTnP2JP4TM2nNpcqp',
    id: '1bTZ1OTnP2JP4TM2nNpcqp',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b27334ef8f7d06cf2fc2146f420a',
        width: 640,
      },
    ],
    name: 'Lonely heart club band',
    owner: {
      display_name: 'Chor',
      external_urls: {
        spotify: 'https://open.spotify.com/user/22ekb6z247ehuekkeofnzwe4y',
      },
      href: 'https://api.spotify.com/v1/users/22ekb6z247ehuekkeofnzwe4y',
      id: '22ekb6z247ehuekkeofnzwe4y',
      type: 'user',
      uri: 'spotify:user:22ekb6z247ehuekkeofnzwe4y',
    },
    primary_color: null,
    public: true,
    snapshot_id: 'NSw2Y2M1NjllMmQ2MWQwYzIyNzMyZmFlNGFlNmUyNDdjZTk3YzAxNzA3',
    tracks: {
      href: 'https://api.spotify.com/v1/playlists/1bTZ1OTnP2JP4TM2nNpcqp/tracks',
      total: 2,
    },
    type: 'playlist',
    uri: 'spotify:playlist:1bTZ1OTnP2JP4TM2nNpcqp',
    ...attributes,
  };
}

casual.define('SimplifiedPlaylistObject', SimplifiedPlaylistObjectFactory);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Casual {
    export interface Casual {
      SimplifiedPlaylistObject: typeof SimplifiedPlaylistObjectFactory;
    }
  }
}
