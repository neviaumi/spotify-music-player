import { useContext } from 'react';

import AuthContext, { AccessInfo } from '../contexts/Auth';
import AuthenticationExpiredError from '../errors/AuthenticationExpiredError';
import UnAuthenticatedError from '../errors/UnAuthenticatedError';
import getCurrentTimestamp from '../utils/getCurrentTimestamp';

export default () => {
  const context = useContext(AuthContext);
  const setAccessInfo = (accessInfo: AccessInfo) => {
    if (accessInfo) {
      Object.assign(context, {
        _accessInfo: accessInfo,
        isAuthenticated: true,
      });
    }
  };
  const getAccessInfo = () => {
    const { isAuthenticated, _accessInfo } = context;
    if (!isAuthenticated || !_accessInfo) {
      // context.isAuthenticated = false;
      throw new UnAuthenticatedError();
    }
    const currentTimestamp = getCurrentTimestamp();
    if (currentTimestamp >= _accessInfo.expiredAt) {
      // setTimeout(() => (context.isAuthenticated = false));
      throw new AuthenticationExpiredError(
        _accessInfo.token,
        _accessInfo.expiredAt,
      );
    }
    return _accessInfo.token;
  };
  return { setAccessInfo, getAccessInfo };
};
