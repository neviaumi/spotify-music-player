import { QuestionCircle } from '@styled-icons/bootstrap';
import styled from 'styled-components';

import type { PlaybackDevice } from '../../../../../../contexts/SpotifyWebPlayback/states/PlaybackState';
import headerImg from './connect-header.png';
import { ConnectedDeviceItem } from './ConnectedDeviceItem';

const DeviceListContainer = styled.section`
  width: 280px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.contrast2};
`;

const InfoTitle = styled.section`
  display: flex;
  align-items: center;
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
    width: 16px;
    height: 24px;
  }
`;

const ImageWrapper = styled.section`
  display: flex;
  justify-content: center;
  padding: ${props => props.theme.spaces.m} 0;
`;

const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

export function ConnectedDeviceList({
  currentDeviceId,
  devices,
}: {
  currentDeviceId: string;
  devices: PlaybackDevice[];
}) {
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
            key={device.id}
          />
        ))}
      </ListContainer>
    </DeviceListContainer>
  );
}
