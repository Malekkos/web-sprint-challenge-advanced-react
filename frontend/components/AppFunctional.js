import  React from 'react'
import { useState } from "react"
import axios from "axios"
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at


// THOUGHTS

// when moving up, subtract by 3
// When moving down, add by 3
// When moving right, add 1
// when moving left, subtract 1
// we know where the block is due to index measuring from 0 to 8 (9 spaces)

// finding coord's / row and column
// from 0 to 8, just have all the cords aka 1,1 is at index 0 1,2 is index 1
// or, moving left subtracts the first num by 1
// movign right increases the first numb by 1
// moving down increases the second num by 1
// moving up decreases the second num by 1

// Error message
//The above can also be used for the error message i think
// When the action of moving would place the number at 0 or 4, return the error message instead with whatever the move was


// You moved x times
// very easy.


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  let [index, setIndex] = useState(initialIndex)
  let [steps, setSteps] = useState(0)
  let [message, setMessage] = useState(initialMessage)
  let [email, setEmail] = useState(initialEmail)

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let x = index % 3 + 1;
    let y = index / 3 + 1;
    let roundedY = Math.floor(y)
    // console.log(x, roundedY)
    return {x , roundedY}
  }
// Determining how to get coords
// using the index of b
//








  function getXYMessage(direction) {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

    if(getXY().x === 1 && direction == "left") {
      console.log(setMessage(`you can't go ${direction}`))
      return index
    }
    if(getXY().roundedY === 1 && direction === "up") {
      console.log(setMessage(`you can't go ${direction}`))
      return index
    }
    if(getXY().x === 3 && direction === "right") {
      console.log(setMessage(`you can't go ${direction}`))
      return
    }
    if(getXY().roundedY === 3 && direction ==="down") {
      console.log(setMessage(`you can't go ${direction}`))
      return
    }
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex)
    setSteps(initialSteps)
    setMessage(initialMessage)
    setEmail(initialEmail)
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    // getXYMessage(direction)
    console.log(getXY().x, getXY().roundedY)
    if (direction === "left" && getXY().x !== 1) {
      setIndex(index - 1)
      setSteps(steps + 1)
    } else {
      getXYMessage(direction)
    }
    if (direction === "down" && getXY().roundedY !== 3) {
      setIndex(index + 3)
      setSteps(steps + 1)
    } else {
      getXYMessage(direction)
    }
    if (direction === "right" && getXY().x !== 3) {
      setIndex(index + 1)
      setSteps(steps + 1)
    } else {
      getXYMessage(direction)
    }
    if (direction === "up" && getXY().roundedY !== 1) {
      setIndex(index - 3)
      setSteps(steps + 1)
    } else {
      getXYMessage(direction)
    }

  }
  
  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    let direction = evt

    getNextIndex(direction)
    }

  function onChange(evt) {
    // You will need this to update the value of the input.
    // console.log(evt.target.value)
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    axios.post("http://localhost:9000/api/result", {
      "x": getXY().x,
      "y": getXY().roundedY,
      "steps": steps,
      "email": email
    } )
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY().x}, {getXY().roundedY}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => {move("left")}} id="left">LEFT</button>
        <button onClick={() => {move("up")}} id="up">UP</button>
        <button onClick={() => {move("right")}} id="right">RIGHT</button>
        <button onClick={() => {move("down")}} id="down">DOWN</button>
        <button onClick={() => {reset()}} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={email} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
