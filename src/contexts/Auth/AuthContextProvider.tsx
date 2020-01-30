import React, {ReactNode} from 'react'

import AuthContext, {AuthContextValue} from "./index"

interface Props extends Partial<AuthContextValue>{
  children: ReactNode
}

export default ({ isAuthenticated, _accessInfo, children }: Props) => {

  const contextValue: AuthContextValue = {
    isAuthenticated: isAuthenticated || false,
    _accessInfo: _accessInfo
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}