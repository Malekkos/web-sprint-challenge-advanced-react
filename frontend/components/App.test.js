// Write your tests here
import AppClass from "./AppClass"
import { render, screen, waitFor } from '@testing-library/react'
import React from "react"
import "@testing-library/jest-dom"
import userEvent from '@testing-library/user-event'

//Test that visible text from headings buttons links are on the screen
//test that typing on the input results in its value changing to the entered text
// PERSONAL \/
// check if attempts to break the program work
// const {default: userEvent} = require('@testing-library/user-event')
test('sanity', () => {
  expect(true).toBe(true)
})
test("Harcoded text is visible on the screen", () => {
  //arrange
  render(<AppClass />)
  //act
  let coordinatesText = screen.getByText("Coordinates (2, 2)")
  // console.log(coordinatesText)
  let leftButtonText = screen.getByRole("button", { name: "LEFT"})
  // console.log(leftButtonText)
  let upButtonText = screen.getByText("UP")
  let rightButtonText = screen.getByText("RIGHT")
  let downButtonText = screen.getByText("DOWN")
  let resetButtonText = screen.getByText("reset")
  // let submitButtonText = screen.getByRole("input#submit")

  //assert
  expect(coordinatesText).toHaveTextContent("Coordinates (2, 2)")
  expect(leftButtonText).toHaveTextContent(/LEFT/i)
  expect(upButtonText).toHaveTextContent(/UP/i)
  expect(rightButtonText).toHaveTextContent(/RIGHT/i)
  expect(downButtonText).toHaveTextContent(/DOWN/i)
  expect(resetButtonText).toHaveTextContent(/reset/i)
})

test("Typing into a input, email, changes its value", () => {
  render (<AppClass />)

  let emailInput = screen.getByRole("textbox")
  userEvent.click(emailInput)
  userEvent.type(emailInput, "garcia@mojave.com")

 waitFor(() => {expect(emailInput).toHaveTextContent(/garcia@mojave.com/i)})
})