export function PagingObject<T>(items: T[], attributes?: any) {
  return {
    href: 'https://api.spotify.com/v1/users/22ekb6z247ehuekkeofnzwe4y/playlists?offset=0&limit=1',
    items: items,
    limit: 1,
    next: 'https://api.spotify.com/v1/users/22ekb6z247ehuekkeofnzwe4y/playlists?offset=1&limit=1',
    offset: 0,
    previous: null,
    total: 30,
    ...attributes,
  };
}

export function CursorPagingObject<T>(items: T[], attributes?: any) {
  return {
    cursors: {
      after: '1615110713338',
      before: '1615110713338',
    },
    href: 'https://api.spotify.com/v1/me/player/recently-played?limit=1',
    items: items,
    limit: 1,
    next: 'https://api.spotify.com/v1/me/player/recently-played?before=1615110713338&limit=1',
    ...attributes,
  };
}
