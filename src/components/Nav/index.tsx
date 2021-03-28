import type { PropsWithChildren } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { ErrorFallback } from '../ErrorFallback';
import { Logo } from '../Logo';
import { withSuspense } from '../Suspense/withSuspense';
import { UserPlayList } from '../UserPlayList/UserPlayList';

const Container = styled.nav`
  padding-top: ${props => props.theme.spaces.xxl};
`;

const NavItemContainer = styled.ul`
  display: block;
  margin: 0px;
  padding: 0 ${props => props.theme.spaces.xxs};
`;

const NavItem = styled.li<{ active?: boolean }>`
  display: block;
  font-size: ${props => props.theme.typography.size.s};
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  padding: 0 ${props => props.theme.spaces.m};
  ${({ active, theme }) =>
    active
      ? `
color: ${theme.colors.foreground};
background-color: ${theme.colors.contrast2};
font-weight: bold;
    `
      : `
color: ${theme.colors.contrast4};
&:hover {
color: ${theme.colors.foreground};
}
  `}
`;

export function PresentNav() {
  const history = useHistory();
  const location = useLocation();
  return (
    <Container>
      <Logo />
      <NavItemContainer>
        <NavItem
          active={location.pathname === '/'}
          data-testid="nav-home"
          onClick={() => history.push('/')}
        >
          Home
        </NavItem>
      </NavItemContainer>
      <UserPlayList />
    </Container>
  );
}

export const Nav = withErrorBoundary<PropsWithChildren<unknown>>(
  withSuspense<PropsWithChildren<unknown>>(PresentNav),
  {
    FallbackComponent: ErrorFallback,
  },
);
