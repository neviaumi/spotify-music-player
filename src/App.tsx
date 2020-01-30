import React from "react"

import AuthContextProvider from "./contexts/Auth/AuthContextProvider"
import Router from "./Router"

function App() {
  return (<AuthContextProvider><Router /></AuthContextProvider>)
}

export default App
