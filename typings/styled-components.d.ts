import 'styled-components';

import * as themes from '../src/themes';

declare module 'styled-components' {
  export type DefaultTheme = themes;
}
