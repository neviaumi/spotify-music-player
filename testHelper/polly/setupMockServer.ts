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
  polly?.server.host('https://api.spotify.com/v1', () => {
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
