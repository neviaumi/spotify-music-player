import axios from 'axios';

export default function createSpotifyAPIClient(accessToken: string) {
  const client = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return client;
}

export function createSpotifyAPIClientForTesting() {
  return createSpotifyAPIClient(
    process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN as string,
  );
}
