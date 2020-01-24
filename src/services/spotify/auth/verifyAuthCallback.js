export default url => {
  const _url = new URL(url)
  const params = _url.hash
    ? new URLSearchParams(_url.hash.slice(1))
    : _url.searchParams
  return {
    access_token: params.get("access_token"),
    token_type: params.get("token_type"),
    expires_in: params.get("expires_in"),
    error: params.get("error"),
    state: params.get("state")
  }
}
