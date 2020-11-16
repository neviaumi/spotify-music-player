import { createContext } from 'react';

export interface AuthContextValue {
  _accessInfo?: AccessInfo;
  isAuthenticated: boolean;
}

export interface AccessInfo {
  expiredAt: number;
  token: string;
}

export default createContext<AuthContextValue>({
  _accessInfo: {
    expiredAt: 0,
    token: '',
  },
  isAuthenticated: false,
});
