import nanoid from 'nanoid';

import openidConfiguration from './openidConfiguration';

export interface State {
  [key: string]: unknown;
}

export function getAuthorizeUrl(transactionId: string) {
  const authorizeUrl = new URL(openidConfiguration.authorization_endpoint);
  const queryParams = authorizeUrl.searchParams;
  queryParams.append(
    'client_id',
    process.env.REACT_APP_SPOTIFY_CLIENT_ID as string,
  );
  queryParams.append(
    'scope',
    [
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-read-recently-played',
      'user-top-read',
    ].join(' '),
  );
  queryParams.append('response_type', openidConfiguration.response_types[0]);
  queryParams.append('redirect_uri', openidConfiguration.redirect_uris[0]);
  queryParams.append('show_dialog', 'false');
  queryParams.append('state', transactionId);
  return authorizeUrl.toString();
}

export function loginRedirect(state: State) {
  const transactionId = nanoid();
  const url = getAuthorizeUrl(transactionId);
  window.localStorage.setItem(transactionId, JSON.stringify(state));
  window.location.replace(url);
}
