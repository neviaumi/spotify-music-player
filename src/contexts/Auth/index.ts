import { createContext } from 'react';

export interface AuthContextValue {
  isAuthenticated: boolean;
  _accessInfo?: AccessInfo;
}

export interface AccessInfo {
  token: string;
  expiredAt: number;
}

export default createContext<AuthContextValue>({
  isAuthenticated: false,
  _accessInfo: {
    token: '',
    expiredAt: 0,
  },
});
