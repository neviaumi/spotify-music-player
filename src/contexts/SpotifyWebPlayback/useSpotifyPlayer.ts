import './SpotifyPlayer.d';

import { useEffect, useState } from 'react';

import { useAuthContext } from '../Auth/AuthContext';

export interface SpotifyPlayerProps {
  onPlayStateChange: (state: null | Spotify.PlaybackState) => void;
  player?: Spotify.SpotifyPlayer;
}

const playbackScriptId = 'spotify-web-playback-script';

export function useSpotifyPlayer({
  onPlayStateChange,
  player: preConstructedPlayerInstance,
}: SpotifyPlayerProps) {
  const [isPlayerScriptLoaded, togglePlayerScriptLoaded] = useState(
    document.getElementById(playbackScriptId) !== null,
  );
  const [player, setSpotifyPlayer] = useState<
    Spotify.SpotifyPlayer | undefined
  >(preConstructedPlayerInstance);
  const { getOrRefreshAccessToken } = useAuthContext();

  useEffect(
    function loadSpotifyPlayScript() {
      if (isPlayerScriptLoaded || player !== undefined) return;
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
      onPlayStateChange,
      getOrRefreshAccessToken,
    ],
  );
  useEffect(
    function setupSpotifyPlayer() {
      if (player !== undefined || !isPlayerScriptLoaded) return;
      const playerInstance = new window.Spotify.Player({
        getOAuthToken: async callback => {
          getOrRefreshAccessToken().then(callback);
        },
        name: window.location.host,
      });

      playerInstance.addListener('ready', () => {
        // @ts-expect-error type mis-match
        setSpotifyPlayer(playerInstance);
      });
      playerInstance.addListener('player_state_changed', onPlayStateChange);
      playerInstance.connect();
    },
    [
      onPlayStateChange,
      player,
      setSpotifyPlayer,
      getOrRefreshAccessToken,
      isPlayerScriptLoaded,
    ],
  );

  return {
    isPlayerReady: player !== undefined,
    player,
  };
}
