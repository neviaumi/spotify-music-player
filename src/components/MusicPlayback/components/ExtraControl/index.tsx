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
    data: { volumePercent, setVolume, playbackType },
    isLoading,
  } = useSpotifyWebPlayback();
  return (
    <Container>
      <PickConnectedDevice />
      <VolumeBar
        currentVolume={volumePercent}
        isLoading={isLoading}
        onChangeVolume={setVolume}
        playbackType={playbackType}
      />
    </Container>
  );
}
