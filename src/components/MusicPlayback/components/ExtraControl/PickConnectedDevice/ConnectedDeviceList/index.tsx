import { QuestionCircle } from '@styled-icons/bootstrap';
import styled from 'styled-components';

import type { UserDevice } from '../../../../../../hooks/spotify/typings/UserDevice';
import headerImg from './connect-header.png';
import { ConnectedDeviceItem } from './ConnectedDeviceItem';

const DeviceListContainer = styled.section`
  background-color: ${props => props.theme.colors.contrast2};
  border-radius: 5px;
  width: 280px;
`;

const InfoTitle = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  padding: ${props => props.theme.spaces.s} ${props => props.theme.spaces.xxs};
`;

const Heading = styled.h1`
  color: ${props => props.theme.colors.foreground};
  font-size: ${props => props.theme.typography.size.l};
  font-weight: bold;
  margin: 0px;
`;

const Link = styled.a`
  outline: none;
  svg {
    fill: ${props => props.theme.colors.foreground};
    height: 24px;
    width: 16px;
  }
`;

const ImageWrapper = styled.section`
  display: flex;
  justify-content: center;
  padding: ${props => props.theme.spaces.m} 0;
`;

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export function ConnectedDeviceList({
  currentDeviceId,
  devices,
  onSelectDevice,
}: {
  currentDeviceId?: string;
  devices: UserDevice[];
  onSelectDevice: (deviceId: string) => void;
}) {
  if (devices.length === 0 || !currentDeviceId) return null;
  return (
    <DeviceListContainer>
      <InfoTitle>
        <Heading>Connect to a device</Heading>
        <Link
          href={
            'https://www.spotify.com/connect/?utm_source=wp-picker&utm_medium=web'
          }
          target={'_blank'}
        >
          <QuestionCircle />
        </Link>
      </InfoTitle>
      <ImageWrapper>
        <img src={headerImg} />
      </ImageWrapper>
      <ListContainer>
        {devices.map(device => (
          <ConnectedDeviceItem
            device={device}
            isCurrentDevice={currentDeviceId === device.id}
            key={device.id ?? device.name}
            onClick={onSelectDevice}
          />
        ))}
      </ListContainer>
    </DeviceListContainer>
  );
}
