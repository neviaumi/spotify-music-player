import React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import styled from 'styled-components';

import UserPlayList from '../PlayList/UserPlayList';

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
      <NavItem data-testid="nav-home" active={location.pathname === '/'}>
        Home
      </NavItem>
      <NavItem>Search</NavItem>
      <NavItem>Your Library</NavItem>
      <UserPlayList />
    </Container>
  );
}

export default withRouter(Nav);
