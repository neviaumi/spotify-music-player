import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100%;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  display: grid;
  grid-template-rows: auto 90px;
  grid-template-columns: 234px auto;
  grid-gap: 0 0;
  grid-template-areas:
    'nav-bar main-view'
    'now-playing-bar now-playing-bar';
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
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

interface Props {
  Left: React.ReactNode;
  Right: React.ReactNode;
  Bottom: React.ReactNode;
}

export default function Panel({ Left, Right, Bottom, ...rest }: Props) {
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
