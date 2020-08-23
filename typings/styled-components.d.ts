import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      green: string;
      natural128: string;
      natural255: string;
      white: string;
    };
    spaces: {
      l: string;
      m: string;
      s: string;
      xl: string;
      xs: string;
      xxl: string;
    };
  }
}
