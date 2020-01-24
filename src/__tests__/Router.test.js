import { render } from "@testing-library/react"
import React from "react"

import Router from "../Router"

it("Should render without error", () => {
  const { container } = render(<Router />)
  expect(container.firstChild).toEqual(null)
})
