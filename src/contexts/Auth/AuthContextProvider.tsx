import React, { ReactNode } from 'react';

import AuthContext, { AccessInfo, AuthContextValue } from './index';

interface Props {
  children: ReactNode;
  isAuthenticated?: boolean;
  _accessInfo: AccessInfo;
}

export default ({ isAuthenticated, _accessInfo, children }: Props) => {
  const contextValue: AuthContextValue = {
    isAuthenticated: isAuthenticated || false,
    _accessInfo: _accessInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
