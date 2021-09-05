import { useCallback, useEffect, useState } from 'react';
import retry from 'retry';

import { useAuthContext } from '../../Auth/AuthContext';

const playbackScriptId = 'spotify-web-playback-script';

interface Props {
  onPlayerStateChanged: Spotify.PlaybackStateListener;
}

export function useLocalSpotifyPlayback({ onPlayerStateChanged }: Props) {
  const [isPlayerScriptLoaded, togglePlayerScriptLoaded] = useState(
    document.getElementById(playbackScriptId) !== null,
  );
  const [player, setSpotifyPlayer] = useState<Spotify.Player | undefined>(
    undefined,
  );
  const [playerError, setPlayerError] = useState<Spotify.Error | undefined>(
    undefined,
  );
  const { getOrRefreshAccessToken } = useAuthContext();

  const onPlayerError = useCallback(
    (err: Spotify.Error) => {
      setPlayerError(err);
    },
    [setPlayerError],
  );
  useEffect(
    function loadSpotifyPlayScript() {
      if (isPlayerScriptLoaded) return;
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.id = playbackScriptId;
      document.body.appendChild(script);
      window.onSpotifyWebPlaybackSDKReady = () => {
        togglePlayerScriptLoaded(true);
      };
    },
    [
      isPlayerScriptLoaded,
      togglePlayerScriptLoaded,
      player,
      getOrRefreshAccessToken,
    ],
  );
  useEffect(
    function setupSpotifyPlayer() {
      if (!isPlayerScriptLoaded || player) return;
      const playerInstance = new window.Spotify.Player({
        getOAuthToken(callback) {
          const operation = retry.operation();

          operation.attempt(() => {
            getOrRefreshAccessToken()
              .then(callback)
              .catch(err => {
                if (operation.retry(err)) return;
                throw err;
              });
          });
        },
        name: window.location.host,
        volume: 0.2,
      });

      playerInstance.addListener('ready', ({ device_id }) => {
        playerInstance._options.id = device_id; // https://developer.spotify.com/documentation/web-playback-sdk/reference/#playing-a-spotify-uri
        setSpotifyPlayer(playerInstance);
      });
      playerInstance.addListener('player_state_changed', onPlayerStateChanged);
      playerInstance.addListener('account_error', onPlayerError);
      playerInstance.addListener('initialization_error', onPlayerError);
      playerInstance.addListener('playback_error', onPlayerError);
      playerInstance.addListener('authentication_error', onPlayerError);
      playerInstance.connect();
    },
    [
      onPlayerStateChanged,
      onPlayerError,
      setSpotifyPlayer,
      getOrRefreshAccessToken,
      isPlayerScriptLoaded,
      player,
    ],
  );

  return {
    player,
    playerError,
  };
}
