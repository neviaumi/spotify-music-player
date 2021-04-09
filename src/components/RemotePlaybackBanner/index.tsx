import type { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { useSpotifyWebPlayback } from '../../contexts/SpotifyWebPlayback';
import type { PlaybackDevice } from '../../contexts/SpotifyWebPlayback/states/PlaybackState';
import { PlaybackType } from '../../contexts/SpotifyWebPlayback/states/PlaybackState';
import { ReactComponent as ConnectIcon } from './spotify-connect-icon.svg';

const RemotePlaybackBannerContainer = styled.aside`
  background-color: ${props => props.theme.colors.lightGreen};
  height: 24px;
  padding: ${props => props.theme.spaces.xxxs} ${props => props.theme.spaces.m};
  box-sizing: border-box;
  color: ${props => props.theme.colors.background};
  font-size: ${props => props.theme.typography.size.s};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const RemotePlaybackBannerHeading = styled.h1`
  font-size: ${props => props.theme.typography.size.s};
  display: inline;
  margin-left: ${props => props.theme.spaces.xxxs};
  z-index: 1;
`;

const RemotePlaybackBannerIcon = styled(ConnectIcon)`
  fill: ${props => props.theme.colors.background};
  margin-right: ${props => props.theme.spaces.xxxs};
`;

const RemotePlaybackBannerArrow = styled.div`
  background-color: ${props => props.theme.colors.lightGreen};
  position: absolute;
  width: 15px;
  height: 15px;
  top: -7px;
  right: 150px;
  transform: rotate(45deg);
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
  min-height: 100%;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: grid;
  grid-gap: 0 0;
`;

export function RemotePlaybackBannerWrapper({
  children,
}: PropsWithChildren<unknown>) {
  const {
    data: { currentPlaybackDevice, playbackType },
  } = useSpotifyWebPlayback();
  const shouldShowRemotePlaybackBanner = playbackType === PlaybackType.Remote;
  return (
    <RemotePlaybackBannerWrapperContainer>
      {children}
      {currentPlaybackDevice && shouldShowRemotePlaybackBanner && (
        <RemotePlaybackBanner currentDevice={currentPlaybackDevice} />
      )}
    </RemotePlaybackBannerWrapperContainer>
  );
}
