import type { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.foreground};
  display: grid;
  grid-gap: 0 0;
  grid-template-areas:
    'nav-bar main-view'
    'now-playing-bar now-playing-bar';
  grid-template-columns: 234px auto;
  grid-template-rows: auto 90px;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  min-height: 100%;
  overflow: hidden;
  width: 100%;
`;

const LeftContainer = styled.div`
  grid-area: nav-bar;
  overflow: hidden;
`;

const RightContainer = styled.div`
  grid-area: main-view;
  overflow: hidden;
`;

const BottomContainer = styled.div`
  grid-area: now-playing-bar;
`;

const ScrollAbleWrapper = styled.div`
  height: 100%;
  overflow: scroll;
  width: 100%;
`;

interface Props {
  Bottom: ReactNode;
  Left: ReactNode;
  Right: ReactNode;
}

export function Panel({ Left, Right, Bottom, ...rest }: Props) {
  return (
    <Container {...rest}>
      <LeftContainer data-testid="panel-left">{Left}</LeftContainer>
      <BottomContainer data-testid="panel-bottom">{Bottom}</BottomContainer>
      <RightContainer data-testid="panel-right">
        <ScrollAbleWrapper>{Right}</ScrollAbleWrapper>
      </RightContainer>
    </Container>
  );
}
