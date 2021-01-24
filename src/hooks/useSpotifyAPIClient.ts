import { useAuthContext } from '../contexts/Auth/AuthContext';
import createSpotifyAPIClient from '../utils/createSpotifyAPIClient';

export default () => {
  const { accessToken, refreshAccessToken } = useAuthContext();
  return createSpotifyAPIClient(accessToken!, refreshAccessToken);
};
