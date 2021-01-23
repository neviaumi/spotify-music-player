const { protocol, host } = window.location;

export default {
  authorization_endpoint: 'https://accounts.spotify.com/authorize',
  redirect_uris: [`${protocol}//${host}/auth/login/callback`],
  response_types: ['token'],
  userinfo_endpoint: 'https://api.spotify.com/v1/me',
};
