import './SpotifyPlayer.d';

import { useCallback, useEffect, useState } from 'react';

import { useAuthContext } from '../Auth/AuthContext';

export enum PlayerState {
  CONNECTED = 'connected', // player connected but may not taking control
  DISCONNECTED = 'disconnected', // default state
  ERROR = 'error',
  PAUSED = 'paused', // player is taken control and track is paused
  PLAYING = 'playing', // player is playing track
}

export interface SpotifyPlayerProps {
  currentState?: PlayerState;
  onPlayStateChange: (state: null | Spotify.PlaybackState) => void;
  player?: Spotify.SpotifyPlayer;
}

const playbackScriptId = 'spotify-web-playback-script';

export function useSpotifyPlayer({
  onPlayStateChange,
  currentState,
  player: preConstructedPlayerInstance,
}: SpotifyPlayerProps) {
  const [isPlayerScriptLoaded, togglePlayerScriptLoaded] = useState(
    document.getElementById(playbackScriptId) !== null,
  );
  const [player, setSpotifyPlayer] = useState<
    Spotify.SpotifyPlayer | undefined
  >(preConstructedPlayerInstance);
  const [playerConnectState, setPlayerConnectState] = useState<PlayerState>(
    currentState ?? PlayerState.DISCONNECTED,
  );
  const [playerError, setPlayerError] = useState<Spotify.Error | undefined>(
    undefined,
  );
  const { getOrRefreshAccessToken } = useAuthContext();

  const transitPlayerConnectState = useCallback(
    (newState: PlayerState) => {
      if (newState !== playerConnectState) setPlayerConnectState(newState);
    },
    [setPlayerConnectState, playerConnectState],
  );
  const onPlayerError = useCallback(
    (err: Spotify.Error) => {
      transitPlayerConnectState(PlayerState.ERROR);
      setPlayerError(err);
    },
    [setPlayerError, transitPlayerConnectState],
  );
  useEffect(
    function loadSpotifyPlayScript() {
      if (
        isPlayerScriptLoaded ||
        playerConnectState !== PlayerState.DISCONNECTED
      )
        return;
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
      playerConnectState,
    ],
  );
  useEffect(
    function setupSpotifyPlayer() {
      if (
        playerConnectState !== PlayerState.DISCONNECTED ||
        !isPlayerScriptLoaded
      )
        return;
      const playerInstance = new window.Spotify.Player({
        getOAuthToken: async callback => {
          getOrRefreshAccessToken().then(callback).catch(onPlayerError);
        },
        name: window.location.host,
      });

      playerInstance.addListener('ready', () => {
        setSpotifyPlayer(playerInstance);
        transitPlayerConnectState(PlayerState.CONNECTED);
      });
      playerInstance.addListener('player_state_changed', onPlayStateChange);
      playerInstance.addListener('account_error', onPlayerError);
      playerInstance.addListener('initialization_error', onPlayerError);
      playerInstance.addListener('playback_error', onPlayerError);
      playerInstance.addListener('authentication_error', onPlayerError);
      playerInstance.connect();
    },
    [
      onPlayStateChange,
      onPlayerError,
      setSpotifyPlayer,
      getOrRefreshAccessToken,
      isPlayerScriptLoaded,
      playerConnectState,
      transitPlayerConnectState,
    ],
  );

  return {
    player,
    playerConnectState,
    playerError,
    transitPlayerConnectState,
  };
}
