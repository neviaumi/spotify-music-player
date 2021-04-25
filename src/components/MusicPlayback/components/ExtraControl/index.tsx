import styled from 'styled-components';

import { useSpotifyWebPlayback } from '../../../../contexts/SpotifyWebPlayback';
import { PickConnectedDevice } from './PickConnectedDevice';
import { VolumeBar } from './VolumeBar';

const Container = styled.aside`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
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
