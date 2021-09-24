import { Laptop, Phone, Speaker } from '@styled-icons/bootstrap';
import type { Key } from 'react';
import styled from 'styled-components';

import type { UserDevice } from '../../../../../../hooks/spotify/typings/UserDevice';
import ConnectIcon from './spotify-connect-icon.svg';

interface ConnectedDeviceItemProps {
  device: UserDevice;
  onClick?: (id: string) => void;
}

const ConnectDeviceItemContainer = styled.li`
  margin: 0px;
  overflow: hidden;
  padding: ${props => props.theme.spaces.xs} ${props => props.theme.spaces.xxxl}
    ${props => props.theme.spaces.xs} ${props => props.theme.spaces.s};
  &:hover {
    background-color: ${props => props.theme.colors.contrast3};
  }
  button {
    align-items: center;
    background: transparent;
    border: none;
    display: flex;
    max-width: 100%;
    outline: none;
    padding: 0px;
    width: 100%;
  }
`;

const DeviceTypeIconContainer = styled.div`
  height: 32px;
  svg {
    fill: ${props => props.theme.colors.foreground};
    height: 32px;
  }
`;

const CurrentDeviceTypeIconContainer = styled(DeviceTypeIconContainer)`
  svg {
    fill: ${props => props.theme.colors.green};
  }
`;

const DeviceItemInfo = styled.section`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 100%;
  padding: 0px ${props => props.theme.spaces.xs};
`;

const DeviceItemHeadline = styled.h1`
  color: ${props => props.theme.colors.foreground};
  font-size: ${props => props.theme.typography.size.s};
  margin: 0px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CurrentDeviceItemHeadline = styled(DeviceItemHeadline)`
  color: ${props => props.theme.colors.green};
`;

const DeviceItemSecondLine = styled.div`
  align-items: center;
  color: ${props => props.theme.colors.contrast4};
  display: flex;
  font-size: ${props => props.theme.typography.size.xxs};
  margin-top: ${props => props.theme.spaces.xxs};
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  svg {
    fill: ${props => props.theme.colors.contrast4};
  }
`;

const CurrentDeviceItemSecondLine = styled(DeviceItemSecondLine)`
  color: ${props => props.theme.colors.green};
  svg {
    fill: ${props => props.theme.colors.green};
  }
  #name-wrapper {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SpotifyConnectIconWrapper = styled.div`
  height: 16px;
  margin-right: ${props => props.theme.spaces.xxxs};
  width: 16px;
`;

function CandidateConnectDeviceItem({
  device,
  onClick,
}: ConnectedDeviceItemProps) {
  const DeviceTypeIcon =
    {
      Computer: Laptop,
      Smartphone: Phone,
      Speaker: Speaker,
    }[device.type] ?? Speaker;
  return (
    <ConnectDeviceItemContainer>
      <button
        aria-label={device.name}
        onClick={e => {
          e.stopPropagation();
          if (device.id && onClick) onClick(device.id);
        }}
      >
        <DeviceTypeIconContainer>
          <DeviceTypeIcon />
        </DeviceTypeIconContainer>
        <DeviceItemInfo>
          <DeviceItemHeadline>{device.name}</DeviceItemHeadline>
          <DeviceItemSecondLine>
            <SpotifyConnectIconWrapper>
              <ConnectIcon />
            </SpotifyConnectIconWrapper>
            Spotify Connect
          </DeviceItemSecondLine>
        </DeviceItemInfo>
      </button>
    </ConnectDeviceItemContainer>
  );
}

function CurrentConnectedDeviceItem({ device }: ConnectedDeviceItemProps) {
  const DeviceTypeIcon =
    {
      Computer: Laptop,
      Smartphone: Phone,
      Speaker: Speaker,
    }[device.type] ?? Speaker;
  return (
    <ConnectDeviceItemContainer>
      <button aria-label={device.name}>
        <CurrentDeviceTypeIconContainer>
          <DeviceTypeIcon />
        </CurrentDeviceTypeIconContainer>
        <DeviceItemInfo>
          <CurrentDeviceItemHeadline>Listing On</CurrentDeviceItemHeadline>
          <CurrentDeviceItemSecondLine>
            <SpotifyConnectIconWrapper>
              <ConnectIcon />
            </SpotifyConnectIconWrapper>
            <div id={'name-wrapper'}>{device.name}</div>
          </CurrentDeviceItemSecondLine>
        </DeviceItemInfo>
      </button>
    </ConnectDeviceItemContainer>
  );
}

interface Props {
  device: UserDevice;
  isCurrentDevice: boolean;
  key: Key;
  onClick: (id: string) => void;
}

export function ConnectedDeviceItem({
  isCurrentDevice,
  device,
  onClick,
}: Props) {
  if (isCurrentDevice) {
    return <CurrentConnectedDeviceItem device={device} />;
  }
  return <CandidateConnectDeviceItem device={device} onClick={onClick} />;
}
