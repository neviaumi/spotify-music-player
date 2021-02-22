import type { ReactNode } from 'react';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';

export const theme = {
  colors: {
    black: '#191414',
    green: '#1DB954',
    lightGreen: '#1ed760',
    natural128: '#282828', // @TODO: rename to grey40
    natural255: '#b3b3b3', // @TODO: rename to grey179
    white: '#FFFFFF',
  },
  spaces: {
    l: '12px',
    m: '8px',
    s: '4px',
    xl: '16px',
    xs: '2px',
    xxl: '20px',
  },
};

export function AppThemeProvider(props: { children?: ReactNode }) {
  return (
    <StyledComponentThemeProvider theme={theme}>
      {props.children}
    </StyledComponentThemeProvider>
  );
}
