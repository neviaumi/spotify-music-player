import { render } from "@testing-library/react"
import React from "react"

import AuthCallback from "../index"

it("Should render without error", () => {
  const { container } = render(<AuthCallback />)
  expect(container.firstChild.textContent).toContain("access_token")
})
