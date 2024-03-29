import { MusicPlayer } from '@styled-icons/bootstrap';
import { useErrorHandler } from 'react-error-boundary';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import styled, { useTheme } from 'styled-components';

import {
  PlaybackType,
  useSpotifyWebPlayback,
} from '../../../../../contexts/SpotifyWebPlayback';
import type { theme } from '../../../../../contexts/Theme';
import { useAvailableDevices } from '../../../../../hooks/spotify/query/useAvailableDevices';
import { useToggle } from '../../../../../hooks/utils/useToggle';
import { ConnectedDeviceList } from './ConnectedDeviceList';

const PickConnectedDeviceButton = styled.button<{ isPlayingOnRemote: boolean }>`
  background-color: transparent;
  border: none;
  height: 32px;
  outline: none;
  padding: 0px;
  width: 32px;
  svg {
    ${props => {
      const { isPlayingOnRemote, theme, disabled } = props;
      if (disabled) {
        return `
fill: ${theme.colors.contrast3};`;
      }
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
    actions: { transferPlayback },
    data: { playbackType, currentPlaybackState },
  } = useSpotifyWebPlayback();

  const styledTheme = useTheme() as typeof theme;

  const [isPopOverOpen, togglePopOver] = useToggle();
  const isPlayingOnRemoteDevice =
    (playbackType === PlaybackType.Remote &&
      currentPlaybackState &&
      currentPlaybackState.is_active) === true;
  const { data, error } = useAvailableDevices({
    refetchInterval: 3000,
    suspense: false,
  });
  useErrorHandler(error);
  const devices = data?.data?.devices ?? [];
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
            currentDeviceId={currentPlaybackState?.device.id}
            devices={devices}
            onSelectDevice={(deviceId: string) => {
              transferPlayback(deviceId);
              togglePopOver();
            }}
            {...rest}
          />
        </ArrowContainer>
      )}
      isOpen={isPopOverOpen}
      onClickOutside={() => togglePopOver()}
    >
      <PickConnectedDeviceButton
        aria-label={'pick-connected-device-button'}
        disabled={devices.length === 0}
        isPlayingOnRemote={isPlayingOnRemoteDevice}
        onClick={() => togglePopOver()}
      >
        <MusicPlayer height={16} width={16} />
      </PickConnectedDeviceButton>
    </Popover>
  );
}
