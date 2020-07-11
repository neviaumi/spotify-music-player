import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import AuthContext, { AccessInfo } from '../contexts/Auth/AuthContext';
import AuthenticationExpiredError from '../errors/AuthenticationExpiredError';
import UnAuthenticatedError from '../errors/UnAuthenticatedError';
import getCurrentTimestamp from '../utils/getCurrentTimestamp';

export default () => {
  const location = useLocation();
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
      context.isAuthenticated = false;
      throw new UnAuthenticatedError(location);
    }
    const currentTimestamp = getCurrentTimestamp();
    if (currentTimestamp >= _accessInfo.expiredAt) {
      setTimeout(() => (context.isAuthenticated = false));
      throw new AuthenticationExpiredError(
        _accessInfo.token,
        _accessInfo.expiredAt,
        location,
      );
    }
    return _accessInfo.token;
  };
  return { setAccessInfo, getAccessInfo };
};
