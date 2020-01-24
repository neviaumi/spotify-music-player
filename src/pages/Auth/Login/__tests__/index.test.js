import { render } from "@testing-library/react"
import React from "react"

import Login from "../index"

it("Should render without error", () => {
  jest.spyOn(window.location, "replace").mockReturnValue("")
  const { container } = render(<Login />)
  expect(container.firstChild).toEqual(null)
})
