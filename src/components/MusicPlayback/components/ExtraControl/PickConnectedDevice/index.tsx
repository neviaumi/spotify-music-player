import { MusicPlayer } from '@styled-icons/bootstrap';
import { Popover } from 'react-tiny-popover';
import styled from 'styled-components';

import { useSpotifyWebPlayback } from '../../../../../contexts/SpotifyWebPlayback';
import { PlaybackType } from '../../../../../contexts/SpotifyWebPlayback/states/PlaybackState';
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

  const [isPopOverOpen, togglePopOver] = useToggle();
  const isPlayingOnRemoteDevice =
    playbackType === PlaybackType.Remote && isActive;
  return (
    <Popover
      content={
        <ConnectedDeviceList
          currentDeviceId={'10'}
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
          ]}
        />
      }
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
