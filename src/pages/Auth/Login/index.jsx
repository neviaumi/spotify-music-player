import { useEffect } from "react"

import authorize from "../../../services/spotify/auth/authorize"

export default function Login() {
  useEffect(authorize, [])
  return null
}
