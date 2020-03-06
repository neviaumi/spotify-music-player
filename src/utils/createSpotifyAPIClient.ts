import axios from 'axios';

export default (accessToken: string) => {
  // @ts-ignore
  const client = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return client;
};
