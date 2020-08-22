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
  isAuthenticated: false,
  _accessInfo: {
    token: '',
    expiredAt: 0,
  },
});
