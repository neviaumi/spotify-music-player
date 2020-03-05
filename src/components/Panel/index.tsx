import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 230px 1fr;
  grid-template-rows: 1fr 90px;
  grid-gap: 0 0;
`;

const LeftContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: col1-end;
  grid-row-start: 1;
  grid-row-end: 2;
`;

const RightContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: col2-end;
  grid-row-start: 1;
  grid-row-end: 2;
`;

const BottomContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: col2-end;
  grid-row-start: 2;
  grid-row-end: row2-end;
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
      <RightContainer data-testid="panel-right">{Right}</RightContainer>
      <BottomContainer data-testid="panel-bottom">{Bottom}</BottomContainer>
    </Container>
  );
}
