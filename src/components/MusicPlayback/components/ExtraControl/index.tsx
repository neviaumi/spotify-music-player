import styled from 'styled-components';

import { PickConnectedDevice } from './PickConnectedDevice';
import { Props as VolumeBarProps, VolumeBar } from './VolumeBar';

const Container = styled.aside`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
`;

interface Props {
  volumeBar: VolumeBarProps;
}

export function ExtraControl({ volumeBar }: Props) {
  return (
    <Container>
      <PickConnectedDevice />
      <VolumeBar {...volumeBar} />
    </Container>
  );
}
