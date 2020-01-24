import openidConfiguration from "./openidConfiguration"

export default () => {
  const authorizeUrl = new URL(openidConfiguration.authorization_endpoint)
  const queryParams = authorizeUrl.searchParams
  queryParams.append("client_id", process.env.REACT_APP_SPOTIFY_CLIENT_ID)
  queryParams.append("response_type", openidConfiguration.response_types[0])
  queryParams.append("redirect_uri", openidConfiguration.redirect_uris[0])
  return authorizeUrl.toString()
}
