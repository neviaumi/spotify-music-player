import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Logo } from '../Logo';
import { UserPlayList } from '../UserPlayList/UserPlayList';

const Container = styled.nav`
  padding-top: 24px;
`;

const NavItemContainer = styled.ul`
  display: block;
  margin: 0px;
  padding: 0 8px;
`;

const NavItem = styled.li<{ active?: boolean }>`
  display: block;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  padding: 0 16px;
  ${({ active, theme }) =>
    active
      ? `
color: ${theme.colors.white};
background-color: ${theme.colors.natural128};
font-weight: bold;
    `
      : `
color: ${theme.colors.natural255};
&:hover {
color: ${theme.colors.white};
}
  `}
`;

interface Props {
  location: { pathname: string };
}

export function PresentNav({ location, ...rest }: Props) {
  const history = useHistory();

  return (
    <Container {...rest}>
      <Logo />
      <NavItemContainer>
        <NavItem
          active={location.pathname === '/'}
          data-testid="nav-home"
          onClick={() => history.push('/')}
        >
          Home
        </NavItem>
        <NavItem>Search</NavItem>
        <NavItem>Your Library</NavItem>
      </NavItemContainer>
      <UserPlayList />
    </Container>
  );
}

export const Nav = withRouter(PresentNav);
