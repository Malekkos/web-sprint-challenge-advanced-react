// Write your tests here
import AppClass from "./AppClass"
import { render, screen } from '@testing-library/react'
import React from "react"
import "@testing-library/jest-dom"
//Test that visible text from headings buttons links are on the screen
//test that typing on the input results in its value changing to the entered text
// PERSONAL \/
// check if attempts to break the program work

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
  console.log(leftButtonText)
  let upButtonText = screen.getByText("UP")
  let rightButtonText = screen.getByText("RIGHT")
  let downButtonText = screen.getByText("DOWN")
  let resetButtonText = screen.getByText("reset")
  // let submitButtonText = screen.getByRole("input#submit")

  //assert
  expect(coordinatesText).toBeTruthy() //pr sure this means it exists
  expect(leftButtonText).toHaveTextContent("LEFT")
})
