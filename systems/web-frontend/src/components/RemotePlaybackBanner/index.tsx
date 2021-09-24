import type { PropsWithChildren } from 'react';
import styled from 'styled-components';

import {
  PlaybackType,
  useSpotifyWebPlayback,
} from '../../contexts/SpotifyWebPlayback';
import type { PlaybackDevice } from '../../contexts/SpotifyWebPlayback/typings/Playback';
import ConnectIcon from './spotify-connect-icon.svg';

const RemotePlaybackBannerContainer = styled.aside`
  align-items: center;
  background-color: ${props => props.theme.colors.lightGreen};
  box-sizing: border-box;
  color: ${props => props.theme.colors.background};
  display: flex;
  font-size: ${props => props.theme.typography.size.s};
  height: 24px;
  justify-content: flex-end;
  padding: ${props => props.theme.spaces.xxxs} ${props => props.theme.spaces.m};
  position: relative;
`;

const RemotePlaybackBannerHeading = styled.h1`
  display: inline;
  font-size: ${props => props.theme.typography.size.s};
  margin-left: ${props => props.theme.spaces.xxxs};
  z-index: 1;
`;

const RemotePlaybackBannerIcon = styled(ConnectIcon)`
  fill: ${props => props.theme.colors.background};
  margin-right: ${props => props.theme.spaces.xxxs};
`;

const RemotePlaybackBannerArrow = styled.div`
  background-color: ${props => props.theme.colors.lightGreen};
  height: 15px;
  position: absolute;
  right: 150px;
  top: -7px;
  transform: rotate(45deg);
  width: 15px;
`;

export function RemotePlaybackBanner({
  currentDevice,
}: {
  currentDevice: PlaybackDevice;
}) {
  return (
    <RemotePlaybackBannerContainer aria-label={'remote-playback-banner'}>
      <RemotePlaybackBannerArrow />
      <RemotePlaybackBannerIcon />
      {"You're listening on"}
      <RemotePlaybackBannerHeading>
        {currentDevice.name}
      </RemotePlaybackBannerHeading>
    </RemotePlaybackBannerContainer>
  );
}

const RemotePlaybackBannerWrapperContainer = styled.div`
  display: grid;
  grid-gap: 0 0;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  min-height: 100%;
  width: 100%;
`;

export function RemotePlaybackBannerWrapper({
  children,
}: PropsWithChildren<unknown>) {
  const {
    data: { currentPlaybackState, playbackType },
  } = useSpotifyWebPlayback();
  const shouldShowRemotePlaybackBanner =
    currentPlaybackState &&
    currentPlaybackState?.device &&
    playbackType === PlaybackType.Remote;
  return (
    <RemotePlaybackBannerWrapperContainer>
      {children}
      {currentPlaybackState?.device && shouldShowRemotePlaybackBanner && (
        <RemotePlaybackBanner currentDevice={currentPlaybackState?.device} />
      )}
    </RemotePlaybackBannerWrapperContainer>
  );
}
