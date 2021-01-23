import AuthenticationCallbackError from '../../../../errors/AuthenticationCallbackError';
import getCurrentTimestamp from '../../../../utils/getCurrentTimestamp';

export function getCallbackParams(url: string) {
  const _url = new URL(url);
  const params = _url.hash
    ? new URLSearchParams(_url.hash.slice(1))
    : _url.searchParams;
  return {
    access_token: params.get('access_token'),
    error: params.get('error'),
    expires_in: params.get('expires_in'),
    state: params.get('state'),
    token_type: params.get('token_type'),
  };
}

export default (url: string) => {
  const params = getCallbackParams(url);
  if (params.error) {
    throw new AuthenticationCallbackError(params.error);
  }
  const transactionId = params.state as string;
  let transaction = '{}';
  if (transactionId) {
    transaction = window.localStorage.getItem(transactionId) || transaction;
  }
  const currentTimestamp = getCurrentTimestamp();
  return {
    expiredAt: currentTimestamp + Number(params.expires_in || 0),
    state: JSON.parse(transaction),
    token: params.access_token as string,
  };
};
