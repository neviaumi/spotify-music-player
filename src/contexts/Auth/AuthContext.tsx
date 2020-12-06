import { createContext } from 'react';

export interface AccessInfo {
  expiredAt: number;
  token: string;
}

export interface AuthContextValue {
  _accessInfo?: AccessInfo;
  isAuthenticated: boolean;
}

export default createContext<AuthContextValue>({
  _accessInfo: {
    expiredAt: 0,
    token: '',
  },
  isAuthenticated: false,
});
