import crypto from 'crypto';
import http from 'http';
import https from 'https';
import { TextEncoder } from 'util';

import { exectutePromiseWithTimeout } from '../utils/exectutePromiseWithTimeout.js';
import { openBrowser } from '../utils/openBrowser.js';
import { readStreamContent } from '../utils/readStreamContent.js';

function base64URLEncode(buf) {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function prepareRedirectUrl(clientId, scopes) {
  const stateId = crypto.randomUUID();
  const codeVerifier = base64URLEncode(crypto.randomBytes(32));
  const codeChallenge = base64URLEncode(
    crypto
      .createHash('SHA256')
      .update(new TextEncoder().encode(codeVerifier))
      .digest(),
  );
  const authURL = new URL('https://accounts.spotify.com/authorize');
  const queryParams = authURL.searchParams;
  queryParams.append('client_id', clientId);
  queryParams.append('scope', scopes);
  queryParams.append('response_type', 'code');
  queryParams.append(
    'redirect_uri',
    'http://localhost:3000/auth/login/callback',
  );
  queryParams.append('code_challenge_method', 'S256');
  queryParams.append('code_challenge', codeChallenge);
  queryParams.append('show_dialog', 'false');
  queryParams.append('state', stateId);
  return { codeVerifier, url: authURL.toString() };
}

function requestToken(body) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        headers: {
          'Content-Length': body.length,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        hostname: 'accounts.spotify.com',
        method: 'POST',
        path: '/api/token',
        port: 443,
      },
      async res => {
        const resBody = await readStreamContent(res);
        resolve(JSON.parse(resBody.toString('utf-8')));
      },
    );
    req.write(body);
    req.on('error', reject);
    req.end();
  });
}

export async function signToken(clientId, scopes) {
  const { url: authorizeUrl, codeVerifier } = prepareRedirectUrl(
    clientId,
    scopes,
  );
  return new Promise(resolve => {
    const server = http.createServer();
    server.on('request', async (req, res) => {
      const { pathname, searchParams } = new URL(`http://localhost${req.url}`);
      if (pathname !== '/auth/login/callback') {
        res.statusCode = 404;
        return;
      }
      const code = searchParams.get('code');
      const { access_token: accessToken } = await requestToken(
        new URLSearchParams({
          client_id: clientId,
          code,
          code_verifier: codeVerifier,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:3000/auth/login/callback',
        }).toString(),
      );
      res.statusCode = 200;
      res.write(
        JSON.stringify({
          access_token: accessToken,
        }),
      );
      res.end();
      resolve(accessToken);
    });
    server.listen(3000, '0.0.0.0', () => {
      openBrowser(authorizeUrl);
    });
  });
}

export const command = {
  builder(yargs) {
    yargs.positional('client-id', {
      describe: 'Spotify ClientId',
    });
    yargs.positional('scopes', {
      describe: 'Required scopes',
    });
  },
  command: 'sign-token <client-id> <scopes>',
  desc: 'Sign spotify token',
  async handler(argv) {
    const token = await exectutePromiseWithTimeout(
      signToken(argv.clientId, argv.scopes),
      10000,
    );
    process.stdout.write(token);
    process.exit(0);
  },
};
