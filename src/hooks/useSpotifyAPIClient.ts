import axios from 'axios';

import useAccessToken from './useAccessToken';

export default () => {
  const { getAccessInfo } = useAccessToken();
  const accessToken = getAccessInfo();
  const client = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return client;
};
