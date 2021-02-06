import type { ReactNode } from 'react';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components';

import * as theme from '../../themes';

export function AppThemeProvider(props: { children?: ReactNode }) {
  return (
    <StyledComponentThemeProvider theme={theme}>
      {props.children}
    </StyledComponentThemeProvider>
  );
}
