const { protocol, host } = window.location;

// https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
export const authorization_endpoint = 'https://accounts.spotify.com/authorize';
export const code_challenge_methods_supported = ['S256'];
export const redirect_uris = [`${protocol}//${host}/auth/login/callback`];
export const response_types = ['code'];
export const scopes_supported =
  process.env.REACT_APP_SPOTIFY_REQUESTED_SCOPE?.split(' ') ?? [];
export const token_endpoint = 'https://accounts.spotify.com/api/token';
export const userinfo_endpoint = 'https://api.spotify.com/v1/me';
