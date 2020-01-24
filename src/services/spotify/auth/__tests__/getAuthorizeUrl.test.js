import { URL } from "url"

import getAuthorizeUrl from "../getAuthorizeUrl"
import openidConfiguration from "../openidConfiguration"

it("Should return authorization url", () => {
  const url = getAuthorizeUrl()
  const authorizeUrl = new URL(openidConfiguration.authorization_endpoint)
  const queryParams = authorizeUrl.searchParams
  queryParams.append("client_id", process.env.REACT_APP_SPOTIFY_CLIENT_ID)
  queryParams.append("response_type", openidConfiguration.response_types[0])
  queryParams.append("redirect_uri", openidConfiguration.redirect_uris[0])
  expect(url).toEqual(authorizeUrl.toString())
})
