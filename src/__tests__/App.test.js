import { render } from "@testing-library/react"
import React from "react"

import App from "../App"

it("Should render without error", () => {
  const { container } = render(<App />)
  expect(container.firstChild).toEqual(null)
})
