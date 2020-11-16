export default (url: string) => {
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
};
