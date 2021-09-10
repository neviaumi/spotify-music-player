const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const { promises: fs } = require('fs');
const crypto = require('crypto');
const http = require('http');
const open = require('open');
const { TextEncoder } = require('util');

const { randomUUID } = crypto;

function base64URLEncode(buf) {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

dotenv.config();
const clientId = process.env.SNOWPACK_PUBLIC_SPOTIFY_CLIENT_ID;
const scopes = process.env.SNOWPACK_PUBLIC_SPOTIFY_REQUESTED_SCOPE;
const stateId = randomUUID();
const codeVerifier = base64URLEncode(crypto.randomBytes(32));
const codeChallenge = base64URLEncode(
  crypto
    .createHash('SHA256')
    .update(new TextEncoder().encode(codeVerifier))
    .digest(),
);

async function writeAccessTokenToFile(accessToken) {
  const dotenvContent = await fs.readFile(
    path.join(process.cwd(), '.env.test'),
    {
      encoding: 'utf8',
    },
  );
  const newDotEnvContent = dotenvContent
    .split('\n')
    .map(line => {
      const [key, ...rest] = line.split('=');
      return [key, rest.join('=')];
    })
    .map(([key, value]) => {
      if (key === 'SNOWPACK_PUBLIC_SPOTIFY_ACCESS_TOKEN')
        return [key, accessToken];
      return [key, value];
    })
    .map(([key, value]) => [key, value].join('='))
    .join('\n');
  await fs.writeFile(path.join(process.cwd(), '.env.test'), newDotEnvContent);
}

const server = http.createServer();

server.on('request', async (req, res) => {
  const { pathname, searchParams } = new URL(`http://localhost${req.url}`);
  if (pathname !== '/auth/login/callback') {
    res.statusCode = 404;
    return;
  }
  const code = searchParams.get('code');

  const { data } = await axios.request({
    data: new URLSearchParams({
      client_id: clientId,
      code,
      code_verifier: codeVerifier,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:42069/auth/login/callback',
    }).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
  });
  const { access_token: accessToken } = data;
  res.statusCode = 200;
  res.write(
    JSON.stringify({
      access_token: accessToken,
    }),
  );
  res.end();
  await writeAccessTokenToFile(accessToken);
  process.exit(0);
});

server.listen(42069, '0.0.0.0', async () => {
  const authURL = new URL('https://accounts.spotify.com/authorize');
  const queryParams = authURL.searchParams;
  queryParams.append('client_id', clientId);
  queryParams.append('scope', scopes);
  queryParams.append('response_type', 'code');
  queryParams.append(
    'redirect_uri',
    'http://localhost:42069/auth/login/callback',
  );
  queryParams.append('code_challenge_method', 'S256');
  queryParams.append('code_challenge', codeChallenge);
  queryParams.append('show_dialog', 'false');
  queryParams.append('state', stateId);
  await open(authURL.toString());
});
