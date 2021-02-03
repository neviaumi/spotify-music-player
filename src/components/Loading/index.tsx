import styled from 'styled-components';

import { ReactComponent as LoadingSVG } from './loading.svg';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
`;

const ImgContainer = styled.figure`
  height: 300px;
  width: 300px;
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
