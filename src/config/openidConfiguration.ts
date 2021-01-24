const { protocol, host } = window.location;

// https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
export default {
  authorization_endpoint: 'https://accounts.spotify.com/authorize',
  code_challenge_methods_supported: ['S256'],
  redirect_uris: [`${protocol}//${host}/auth/login/callback`],
  response_types: ['code'],
  scopes_supported: [
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-recently-played',
    'user-top-read',
  ],
  token_endpoint: 'https://accounts.spotify.com/api/token',
  userinfo_endpoint: 'https://api.spotify.com/v1/me',
};
