import { URL, URLSearchParams } from "url"

import verifyAuthCallback from "../verifyAuthCallback"

it("Should return valid callback params from url", () => {
  const authorizeUrl = new URL("http://localhost:3000/auth/callback")
  const hashParams = new URLSearchParams()
  hashParams.append("access_token", "foobar")
  hashParams.append("token_type", "Bearer")
  hashParams.append("expires_in", "-1")
  hashParams.append("state", "randomThingHere")
  hashParams.append("xyz", "www")
  authorizeUrl.hash = hashParams.toString()
  const params = verifyAuthCallback(authorizeUrl.toString())
  expect(params).toEqual({
    access_token: "foobar",
    token_type: "Bearer",
    expires_in: "-1",
    state: "randomThingHere",
    error: null
  })
})

it("Should return error params from url", () => {
  const authorizeUrl = new URL(
    "http://localhost:3000/auth/callback?error=unit-test&state=foobar&dummy=i-am-a-teapot"
  )

  const params = verifyAuthCallback(authorizeUrl.toString())
  expect(params).toEqual({
    access_token: null,
    token_type: null,
    expires_in: null,
    error: "unit-test",
    state: "foobar"
  })
})
