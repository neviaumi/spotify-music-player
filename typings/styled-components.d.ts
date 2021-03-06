import 'styled-components';

import { theme } from '../src/contexts/Theme';

declare module 'styled-components' {
  export type DefaultTheme = theme;
}
