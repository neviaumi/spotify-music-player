import { useContext } from 'react';

import AuthContext, { AccessInfo } from '../contexts/Auth';
import getCurrentTimestamp from '../utils/getCurrentTimestamp';

export default () => {
  const context = useContext(AuthContext);
  const setAccessInfo = (accessInfo: AccessInfo) => {
    if (accessInfo) {
      context._accessInfo = accessInfo;
      context.isAuthenticated = true;
    }
  };
  const getAccessInfo = () => {
    if (!context.isAuthenticated || !context._accessInfo) {
      context.isAuthenticated = false;
      // TODO: custom error here
      throw new Error('Custom Error here');
    }
    const currentTimestamp = getCurrentTimestamp();
    if (currentTimestamp >= context._accessInfo.expiredAt) {
      context.isAuthenticated = false;
      // TODO: custom error here
      throw new Error('Custom error here');
    }
    return context._accessInfo.token;
  };
  return { setAccessInfo, getAccessInfo };
};
