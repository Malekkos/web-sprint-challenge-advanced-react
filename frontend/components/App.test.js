// Write your tests here
import AppClass from "./AppClass"
import { render, screen, waitFor } from '@testing-library/react'
import React from "react"
import "@testing-library/jest-dom"
import userEvent from '@testing-library/user-event'

//Test that visible text from headings buttons links are on the screen
//test that typing on the input results in its value changing to the entered text
// PERSONAL \/
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

test("On fresh render, message conatiner is empty", () => {
  render (<AppClass /> )

  let messageContainer = screen.getByRole("heading", {name: ""})

  waitFor(() => {expect(messageContainer).toHaveTextContent("")})
})

test("on fresh render, coordinates are initially 2,2", () => {
  render (<AppClass />)

  let coordinatesContainer = screen.getByRole("heading", {name: "Coordinates (2, 2)"})

  expect(coordinatesContainer).toHaveTextContent("Coordinates (2, 2)")
})

test("Using the directional keys to move the block reflects the movements in the coordinates ", () => {
  render (<AppClass />) 

  let leftButton = screen.getByRole("button", {name: "LEFT"})
  let rightButton = screen.getByRole("button", {name: "RIGHT"})
  let upButton = screen.getByRole("button", {name: "UP"})
  let downButton = screen.getByRole("button", {name: "DOWN"})
  let coordinatesContainer = screen.getByRole("heading", {name: "Coordinates (2, 2)"})

  userEvent.click(leftButton)
  userEvent.click(upButton)
  userEvent.click(rightButton)
  userEvent.click(rightButton)
  userEvent.click(downButton)

  waitFor(() => {expect(coordinatesContainer).toHaveTextContent("Coordinates (3, 2)")})
})