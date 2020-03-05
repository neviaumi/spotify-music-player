import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../../themes';

export default (props: { children?: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
