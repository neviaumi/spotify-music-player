// Intention sort object key by meaning
/* eslint-disable sort-keys-fix/sort-keys-fix, @typescript-eslint/member-ordering, typescript-sort-keys/interface*/

import type { ReactNode } from 'react';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';

interface SizingSystem<T extends string | number> {
  xxxs?: T;
  xxs?: T;
  xs?: T;
  s?: T;
  m?: T;
  l?: T;
  xl?: T;
  xxl?: T;
  xxxl?: T;
}

export const theme = {
  colors: {
    green: '#1DB954',
    lightGreen: '#1ed760',
    background: '#191414',
    contrast1: '#181818',
    contrast2: '#282828',
    contrast3: '#535353',
    contrast4: '#b3b3b3',
    foreground: '#FFFFFF',
  },
  spaces: {
    xxxs: '4px',
    xxs: '8px',
    xs: '10px',
    s: '12px',
    m: '15px',
    l: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  } as SizingSystem<string>,
  typography: {
    size: {
      xxs: '11px',
      xs: '12px',
      s: '14px',
      m: '16px',
      l: '24px',
      xl: '28px',
      xxl: '48px',
    } as SizingSystem<string>,
  },
};

export function AppThemeProvider(props: { children?: ReactNode }) {
  return (
    <StyledComponentThemeProvider theme={theme}>
      {props.children}
    </StyledComponentThemeProvider>
  );
}
