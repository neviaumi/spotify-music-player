import type { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';

export default function AppThemeProvider(props: { children?: ReactNode }) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
