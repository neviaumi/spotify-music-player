import type { ReactNode } from 'react';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';

export const theme = {
  colors: {
    black: '#191414',
    green: '#1DB954',
    grey179: '#b3b3b3',
    grey40: '#282828',
    lightGreen: '#1ed760',
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
