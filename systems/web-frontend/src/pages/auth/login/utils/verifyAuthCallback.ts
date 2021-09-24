import { AuthenticationCallbackError } from '../../../../errors/AuthenticationCallbackError';

export function getCallbackParams(url: string) {
  const _url = new URL(url);
  const params = _url.searchParams;
  return {
    code: params.get('code') as string,
    error: params.get('error'),
    state: params.get('state') as string,
  };
}

export function verifyAuthCallback(url: string) {
  const params = getCallbackParams(url);
  if (params.error) {
    throw new AuthenticationCallbackError(params.error);
  }
  const state = window.localStorage.getItem(params.state);
  if (!state) {
    throw new AuthenticationCallbackError(`Unknown state: ${params.state}`);
  }
  window.localStorage.removeItem(params.state);
  return {
    code: params.code,
    state: JSON.parse(state),
  };
}
