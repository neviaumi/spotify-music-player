import React from "react"

import verifyAuthCallback from "../../../services/spotify/auth/verifyAuthCallback"

export default function AuthCallback() {
  const authResult = verifyAuthCallback(window.location.href)
  return <div>{JSON.stringify(authResult, null, 4)}</div>
}
