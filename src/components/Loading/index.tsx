import styled from 'styled-components';

import LoadingSVG from './loading.svg';

const Container = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.foreground};
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const ImgContainer = styled.figure`
  max-height: 100%;
  max-width: 100%;
`;

export function Loading() {
  return (
    <Container>
      <ImgContainer>
        <LoadingSVG />
      </ImgContainer>
    </Container>
  );
}
