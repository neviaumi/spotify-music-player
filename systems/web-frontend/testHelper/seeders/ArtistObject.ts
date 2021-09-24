export function ArtistObject(attributes?: any) {
  return {
    external_urls: {
      spotify: 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2',
    },
    followers: {
      href: null,
      total: 18842465,
    },
    genres: [
      'beatlesque',
      'british invasion',
      'classic rock',
      'merseybeat',
      'psychedelic rock',
      'rock',
    ],
    href: 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
    id: '3WrFJ7ztbogyGnTHbHJFl2',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/6b2a709752ef9c7aaf0d270344157f6cd2e0f1a7',
        width: 640,
      },
      {
        height: 320,
        url: 'https://i.scdn.co/image/1047bf172446f2a815a99ab0a0395099d621be51',
        width: 320,
      },
      {
        height: 160,
        url: 'https://i.scdn.co/image/0561b59a91a5e904ad2d192747715688d5f05012',
        width: 160,
      },
    ],
    name: 'The Beatles',
    popularity: 89,
    type: 'artist',
    uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
    ...attributes,
  };
}
