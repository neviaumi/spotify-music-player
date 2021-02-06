import { useAuthContext } from '../contexts/Auth/AuthContext';
import { createSpotifyAPIClient } from '../utils/createSpotifyAPIClient';

export function useSpotifyAPIClient() {
  const { accessToken, refreshAccessToken } = useAuthContext();
  return createSpotifyAPIClient(accessToken!, refreshAccessToken);
}
