const { protocol, host } = window.location;

export default {
  redirect_uris: [`${protocol}//${host}/auth/login/callback`],
  response_types: ['token'],
  authorization_endpoint: 'https://accounts.spotify.com/authorize',
  userinfo_endpoint: 'https://api.spotify.com/v1/me',
};
