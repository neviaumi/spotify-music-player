import getCurrentTimestamp from "../../../utils/getCurrentTimestamp"
import getCallbackParams from './getCallbackParams';

export default (url: string) => {
  const params = getCallbackParams(url);
  if (params.error) {
    // TODO: error here
    throw new Error('Custom Error here');
  }
  const currentTimestamp = getCurrentTimestamp()
  return {
    token: params.access_token as string,
    expiredAt:
      currentTimestamp + Number(params.expires_in || 0),
  };
};
