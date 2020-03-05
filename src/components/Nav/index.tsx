import React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import styled from 'styled-components';

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavItem = styled.a<{ active?: boolean }>`
  height: 40px;
  line-height: 40px;
`;

interface Props extends RouteChildrenProps {}

export function Nav({ location, ...rest }: Props) {
  return (
    <Container {...rest}>
      <NavItem active={location.pathname === '/'}>Home</NavItem>
      <NavItem>Search</NavItem>
      <NavItem>Your Library</NavItem>
    </Container>
  );
}

export default withRouter(Nav);
