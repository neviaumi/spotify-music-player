import AuthenticationCallbackError from '../../../errors/AuthenticationCallbackError';
import getCurrentTimestamp from '../../../utils/getCurrentTimestamp';
import getCallbackParams from './getCallbackParams';

export default (url: string) => {
  const params = getCallbackParams(url);
  if (params.error) {
    throw new AuthenticationCallbackError(params.error);
  }
  const currentTimestamp = getCurrentTimestamp();
  return {
    token: params.access_token as string,
    expiredAt: currentTimestamp + Number(params.expires_in || 0),
  };
};
