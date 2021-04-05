import { Laptop, Phone, Speaker } from '@styled-icons/bootstrap';
import type { Key } from 'react';
import styled from 'styled-components';

import type { PlaybackDevice } from '../../../../../../contexts/SpotifyWebPlayback/states/PlaybackState';

interface ConnectedDeviceItemProps {
  device: PlaybackDevice;
}

const ConnectDeviceItemContainer = styled.li`
  margin: 0px;
  overflow: hidden;
  &:hover {
    background-color: ${props => props.theme.colors.contrast3};
  }
  padding: ${props => props.theme.spaces.xs} ${props => props.theme.spaces.xxxl}
    ${props => props.theme.spaces.xs} ${props => props.theme.spaces.s};
  button {
    max-width: 100%;
    outline: none;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    padding: 0px;
  }
`;

const DeviceTypeIconContainer = styled.div`
  height: 32px;
  //width: 47px;
  svg {
    fill: ${props => props.theme.colors.foreground};
    height: 32px;
    //width: 47px;
  }
`;

const CurrentDeviceTypeIconContainer = styled(DeviceTypeIconContainer)`
  svg {
    fill: ${props => props.theme.colors.green};
  }
`;

const DeviceItemInfo = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0px ${props => props.theme.spaces.xs};
`;

const DeviceItemHeadline = styled.h1`
  margin: 0px;
  color: ${props => props.theme.colors.foreground};
  font-size: ${props => props.theme.typography.size.s};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
`;

const CurrentDeviceItemHeadline = styled(DeviceItemHeadline)`
  color: ${props => props.theme.colors.green};
`;

const DeviceItemSecondLine = styled.span`
  margin-top: ${props => props.theme.spaces.xxs};
  color: ${props => props.theme.colors.contrast4};
  font-size: ${props => props.theme.typography.size.xxs};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
`;

const CurrentDeviceItemSecondLine = styled(DeviceItemSecondLine)`
  color: ${props => props.theme.colors.green};
`;

function CandidateConnectDeviceItem({ device }: ConnectedDeviceItemProps) {
  const DeviceTypeIcon =
    {
      computer: Laptop,
      smartphone: Phone,
      speaker: Speaker,
    }[device.type] ?? Speaker;
  return (
    <ConnectDeviceItemContainer>
      <button>
        <DeviceTypeIconContainer>
          <DeviceTypeIcon />
        </DeviceTypeIconContainer>
        <DeviceItemInfo>
          <DeviceItemHeadline>{device.name}</DeviceItemHeadline>
          <DeviceItemSecondLine>Spotify Connect</DeviceItemSecondLine>
        </DeviceItemInfo>
      </button>
    </ConnectDeviceItemContainer>
  );
}

function CurrentConnectedDeviceItem({ device }: ConnectedDeviceItemProps) {
  const DeviceTypeIcon =
    {
      computer: Laptop,
      smartphone: Phone,
      speaker: Speaker,
    }[device.type] ?? Speaker;
  return (
    <ConnectDeviceItemContainer>
      <button>
        <CurrentDeviceTypeIconContainer>
          <DeviceTypeIcon />
        </CurrentDeviceTypeIconContainer>
        <DeviceItemInfo>
          <CurrentDeviceItemHeadline>Listing On</CurrentDeviceItemHeadline>
          <CurrentDeviceItemSecondLine>
            {device.name}
          </CurrentDeviceItemSecondLine>
        </DeviceItemInfo>
      </button>
    </ConnectDeviceItemContainer>
  );
}

interface Props {
  device: PlaybackDevice;
  isCurrentDevice: boolean;
  key: Key;
}

export function ConnectedDeviceItem({ isCurrentDevice, device }: Props) {
  if (isCurrentDevice) {
    return <CurrentConnectedDeviceItem device={device} />;
  }
  return <CandidateConnectDeviceItem device={device} />;
}
