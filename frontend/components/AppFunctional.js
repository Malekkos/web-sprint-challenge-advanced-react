import  React from 'react'
import { useState } from "react"
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
    Math.floor(y)
    console.log(x, y)
    return {x,y}
  }
  getXY()
// Determining how to get coords
// using the index of b
//








  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

    if(getXY(x) === 1 && direction === "down" || "up" || "left") {console.log(setMessage(`you can't go ${direction}`))}
    if(getXY(y) === 1 && direction === "up" || "left" || "right") {console.log(setMessage(`you can't go ${direction}`))}
    if(getXY(x) === 3 && direction === "up" || "right" || "down") {console.log(setMessage(`you can't go ${direction}`))}
    if(getXY(y) === 3 && direction === "right" || "down" || "left") {console.log(setMessage(`you can't go ${direction}`))}
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

    if (direction === "up") {setIndex(index - 3)}
    if (direction === "down") {setIndex(index + 3)}
    if (direction === "right") {setIndex(index + 1)}
    if (direction === "left") {setIndex(index - 1)}

  }
  
  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    let direction = evt
    console.log(coordinates.x)
    console.log(coordinates.y)
    if(coordinates[0] === 1 && direction === "down" || "up" || "left") {console.log("pello")}
    if(coordinates[1] === 1 && direction === "up" || "left" || "right") {console.log("hello")}
    if(coordinates[0] === 3 && direction === "up" || "right" || "down") {console.log("gello")}
    if(coordinates[1] === 3 && direction === "right" || "down" || "left") {console.log("fello")}
    getNextIndex(direction)
    }

  function onChange(evt) {
    // You will need this to update the value of the input.

  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY().x}, {getXY().y}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
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
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
