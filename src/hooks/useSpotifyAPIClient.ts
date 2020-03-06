import createSpotifyAPIClient from '../utils/createSpotifyAPIClient';
import useAccessToken from './useAccessToken';

export default () => {
  const { getAccessInfo } = useAccessToken();
  const accessToken = getAccessInfo();
  return createSpotifyAPIClient(accessToken);
};
