import styled from 'styled-components';

import { useSpotifyWebPlayback } from '../../../../contexts/SpotifyWebPlayback';
import { PickConnectedDevice } from './PickConnectedDevice';
import { VolumeBar } from './VolumeBar';

const Container = styled.aside`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

export function ExtraControl() {
  const {
    actions: { setVolume },
    data: { currentPlaybackState, playbackType },
    isLoading,
  } = useSpotifyWebPlayback();
  const {
    device: { volume_percent },
  } = currentPlaybackState!;
  return (
    <Container>
      <PickConnectedDevice />
      <VolumeBar
        currentVolume={volume_percent}
        isLoading={isLoading}
        onChangeVolume={setVolume}
        playbackType={playbackType}
      />
    </Container>
  );
}
