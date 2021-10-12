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
  const storageKey = `auth-session-${params.state}`;
  const state = window.localStorage.getItem(storageKey);
  if (!state) {
    throw new AuthenticationCallbackError(`Unknown state: ${params.state}`);
  }
  window.localStorage.removeItem(storageKey);
  return {
    code: params.code,
    state: JSON.parse(state),
  };
}
