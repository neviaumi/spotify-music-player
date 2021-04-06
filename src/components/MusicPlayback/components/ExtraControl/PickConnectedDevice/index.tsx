import { MusicPlayer } from '@styled-icons/bootstrap';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import styled, { useTheme } from 'styled-components';

import { useSpotifyWebPlayback } from '../../../../../contexts/SpotifyWebPlayback';
import { PlaybackType } from '../../../../../contexts/SpotifyWebPlayback/states/PlaybackState';
import type { theme } from '../../../../../contexts/Theme';
import { useToggle } from '../../../../../hooks/utils/useToggle';
import { ConnectedDeviceList } from './ConnectedDeviceList';

const PickConnectedDeviceButton = styled.button<{ isPlayingOnRemote: boolean }>`
  outline: none;
  border: none;
  height: 32px;
  width: 32px;
  padding: 0px;
  background-color: transparent;
  svg {
    ${props => {
      const { isPlayingOnRemote, theme } = props;
      if (isPlayingOnRemote) {
        return `
fill: ${theme.colors.green};
&:hover {
  fill: ${theme.colors.lightGreen};
}`;
      }
      return `
fill: ${theme.colors.contrast4};
&:hover {
  fill: ${theme.colors.foreground};
}`;
    }}
  }
`;

export function PickConnectedDevice() {
  const {
    data: { playbackType, isActive },
  } = useSpotifyWebPlayback();

  const styledTheme = useTheme() as typeof theme;

  const [isPopOverOpen, togglePopOver] = useToggle();
  const isPlayingOnRemoteDevice =
    playbackType === PlaybackType.Remote && isActive;
  return (
    <Popover
      content={({ position, childRect, popoverRect, ...rest }) => (
        <ArrowContainer
          arrowColor={styledTheme.colors.contrast2}
          arrowSize={8}
          childRect={childRect}
          popoverRect={popoverRect}
          position={position}
        >
          <ConnectedDeviceList
            currentDeviceId={'30'}
            devices={[
              {
                id: '10',
                name: 'Testing Device 1',
                type: 'computer',
              } as any,
              {
                id: '20',
                name: 'Testing Device 2',
                type: 'smartphone',
              } as any,
              {
                id: '30',
                name:
                  'Testing Device 3 Testing Device 3 Testing Device 3 Testing Device 3 Testing Device 3',
                type: 'smartphone',
              } as any,
              {
                id: '40',
                name:
                  'Testing Device 4 Testing Device 4 Testing Device 4 Testing Device 4 Testing Device 4',
                type: 'smartphone',
              } as any,
            ]}
            {...rest}
          />
        </ArrowContainer>
      )}
      isOpen={isPopOverOpen}
      onClickOutside={() => togglePopOver()}
    >
      <PickConnectedDeviceButton
        isPlayingOnRemote={isPlayingOnRemoteDevice}
        onClick={() => togglePopOver()}
      >
        <MusicPlayer height={16} width={16} />
      </PickConnectedDeviceButton>
    </Popover>
  );
}
