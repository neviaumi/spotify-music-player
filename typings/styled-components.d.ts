import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      green: string;
      white: string;
      black: string;
    };
  }
}
