import type { InterceptHandler, Polly } from '@pollyjs/core';
import * as casual from 'casual';

export function setupMockServer(
  polly: Polly,
  options: {
    handlers?: {
      [key: string]: undefined | InterceptHandler;
    };
  },
) {
  const { handlers = {} } = options;
  polly?.server
    .get('https://ipinfo.io/json')
    .intercept(function handler(_, res) {
      res.status(200).json({
        city: 'Hong Kong',
        country: 'HK',
        hostname: 'google.com',
        ip: '0.0.0.0',
        loc: '0,0',
        org: 'Star link',
        readme: 'https://ipinfo.io/missingauth',
        region: 'Universe',
        timezone: undefined,
      });
    });
  polly?.server.host('https://accounts.spotify.com', () => {
    polly?.server.post('/api/token').intercept((_, res) => {
      res.status(200).json({
        access_token: 'accessTokenFromCode',
        refresh_token: 'refreshTokenFromCode',
      });
    });
  });
  polly?.server.host('https://api.spotify.com/v1', () => {
    polly?.server.get('/playlists/:playlistId').intercept(
      handlers['/playlists/:playlistId'] ||
        function handler(_, res) {
          res.status(200).json(casual.PlaylistObject());
        },
    );
    polly?.server.get('/tracks').intercept(
      handlers['/tracks'] ||
        function handler(_, res) {
          res.status(200).json({
            tracks: [casual.TrackObject({})],
          });
        },
    );
    polly?.server.get('/browse/featured-playlists').intercept(
      handlers['/browse/featured-playlists'] ||
        function handler(_, res) {
          res.status(200).json({
            message: 'Unit test',
            playlists: casual.PagingObject([
              casual.SimplifiedPlaylistObject({}),
            ]),
          });
        },
    );
    polly?.server.get('/me/top/artists').intercept(
      handlers['/me/top/artists'] ||
        function handler(_, res) {
          res.status(200).json(casual.PagingObject([casual.ArtistObject({})]));
        },
    );
    polly?.server.get('/me/top/tracks').intercept(
      handlers['/me/top/tracks'] ||
        function handler(_, res) {
          res.status(200).json(casual.PagingObject([casual.TrackObject({})]));
        },
    );
    polly?.server.get('/recommendations').intercept(
      handlers['/recommendations'] ||
        function handler(_, res) {
          res
            .status(200)
            .json(
              casual.RecommendationsObject([casual.SimplifiedTrackObject({})]),
            );
        },
    );
    polly?.server.get('/me/player/recently-played').intercept(
      handlers['/me/player/recently-played'] ||
        function handler(_, res) {
          res
            .status(200)
            .json(casual.CursorPagingObject([casual.PlayHistoryObject({})]));
        },
    );
    polly?.server.get('/albums/:albumId').intercept(
      handlers['/albums/:albumId'] ||
        function handler(_, res) {
          res.status(200).json(casual.AlbumObject());
        },
    );
    polly?.server.get('/me/playlists').intercept(
      handlers['/me/playlists'] ||
        function handler(_, res) {
          res.status(200).json({
            items: [casual.SimplifiedPlaylistObject({})],
          });
        },
    );
    polly?.server.get('/me/player').intercept(
      handlers['/me/player'] ||
        function handler(_, res) {
          const resBody = casual.CurrentlyPlayingContextObject({});
          res.status(200).json(resBody);
        },
    );
    polly?.server.put('me/player/play').intercept(
      handlers['/me/player/play'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
    polly?.server.put('me/player/pause').intercept(
      handlers['/me/player/pause'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
    polly?.server.put('me/player/shuffle').intercept(
      handlers['/me/player/shuffle'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
    polly?.server.put('me/player/repeat').intercept(
      handlers['/me/player/repeat'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
    polly.server.post('me/player/next').intercept(
      handlers['/me/player/next'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
    polly.server.post('me/player/previous').intercept(
      handlers['/me/player/previous'] ||
        function handler(_, res) {
          res.status(204);
        },
    );
  });
}
