import styled from 'styled-components';

import { ReactComponent as Next } from './next.svg';
// import { ReactComponent as Pause } from './pause.svg';
import { ReactComponent as Play } from './play.svg';
import { ReactComponent as Previous } from './previous.svg';
import { ReactComponent as Repeat } from './repeat.svg';
// import { ReactComponent as RepeatOne } from './repeat-one.svg';
import { ReactComponent as Shuffle } from './shuffle.svg';

const Container = styled.section`
  display: flex;
  margin-bottom: 12px;
  width: 224px;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.natural255};
  fill: ${props => props.theme.colors.natural255};
  outline: none;

  &:hover {
    color: ${props => props.theme.colors.white};
    fill: ${props => props.theme.colors.white};
  }
`;
const NextButton = styled(Button)``;
const ToggleButton = styled(Button)`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.black};
  fill: ${props => props.theme.colors.black};
  border-radius: 32px;
  &:hover {
    color: ${props => props.theme.colors.black};
    fill: ${props => props.theme.colors.black};
    transform: scale(1.06);
  }
`;
const PreviousButton = styled(Button)``;
const RepeatButton = styled(Button)<{
  enabled: boolean;
}>``;
const ShuffleButton = styled(Button)<{
  enabled: boolean;
}>``;

// interface Props {
//   currentPlayMode: unknown;
//   onChangeRepeatMode: () => void;
//   onClickNextTrack: () => void;
//   onClickPreviousTrack: () => void;
//   onTogglePlay: () => void;
//   onToggleShuffleMode: () => void;
//   repeatMode: unknown;
//   shuffleMode: boolean;
// }

export function ControlButtons() {
  return (
    <Container>
      <ShuffleButton enabled={false}>
        <Shuffle />
      </ShuffleButton>
      <PreviousButton>
        <Previous />
      </PreviousButton>
      <ToggleButton>
        <Play />
      </ToggleButton>
      <NextButton>
        <Next />
      </NextButton>
      <RepeatButton enabled={false}>
        <Repeat />
      </RepeatButton>
    </Container>
  );
}
