import { b64urlFromBuffer } from '@waiting/base64';
import nanoid from 'nanoid';

import openidConfiguration from '../../../../config/openidConfiguration';

export interface State {
  [key: string]: unknown;
}

export async function generateCodeVerifierAndChallenge() {
  // https://tools.ietf.org/html/rfc7636#section-4.1
  const codeVerifier = b64urlFromBuffer(
    crypto.getRandomValues(new Uint8Array(32)),
  );
  // https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow-with-proof-key-for-code-exchange-pkce
  const codeChallenge = b64urlFromBuffer(
    await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(codeVerifier),
    ),
  );

  return {
    codeChallenge,
    codeVerifier,
  };
}

export function getAuthorizeUrl(transactionId: string, codeChallenge: string) {
  const authorizeUrl = new URL(openidConfiguration.authorization_endpoint);

  const queryParams = authorizeUrl.searchParams;
  queryParams.append(
    'client_id',
    process.env.REACT_APP_SPOTIFY_CLIENT_ID as string,
  );
  queryParams.append('scope', openidConfiguration.scopes_supported.join(' '));
  queryParams.append('response_type', openidConfiguration.response_types[0]);
  queryParams.append('redirect_uri', openidConfiguration.redirect_uris[0]);
  queryParams.append(
    'code_challenge_method',
    openidConfiguration.code_challenge_methods_supported[0],
  );
  queryParams.append('code_challenge', codeChallenge);
  queryParams.append('show_dialog', 'false');
  queryParams.append('state', transactionId);
  return authorizeUrl.toString();
}

export async function loginRedirect(state: State) {
  const {
    codeVerifier,
    codeChallenge,
  } = await generateCodeVerifierAndChallenge();
  const transactionId = nanoid();
  const url = getAuthorizeUrl(transactionId, codeChallenge);
  window.localStorage.setItem(
    transactionId,
    JSON.stringify({
      ...state,
      codeVerifier,
    }),
  );
  window.location.replace(url);
  return url;
}
