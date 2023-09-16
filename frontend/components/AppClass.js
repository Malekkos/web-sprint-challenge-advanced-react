import React from 'react'
import axios from "axios"
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super()
    this.state = initialState
  }



  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let x = this.state.index % 3 + 1;
    let y = this.state.index / 3 + 1;
    let roundedY = Math.floor(y)
    // console.log(x, roundedY)
    return {x , roundedY}
  }
  
  getXYMessage = (direction) => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    if(this.getXY().x === 1 && direction == "left") {
      this.setState({message: `You can't go ${direction}`})
    }
    if(this.getXY().roundedY === 1 && direction === "up") {
      this.setState({message: `You can't go ${direction}`})
    }
    if(this.getXY().x === 3 && direction === "right") {
      this.setState({message: `You can't go ${direction}`})
    }
    if(this.getXY().roundedY === 3 && direction ==="down") {
      this.setState({message: `You can't go ${direction}`})
    }
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState)
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    // console.log(this.getXY().x, this.getXY().roundedY)
    if (direction === "left" && this.getXY().x !== 1) {
      this.setState((prevState) => {
        return {index: prevState.index - 1, steps: prevState.steps + 1}
      })
      // setSteps(steps + 1)
    } else {
      this.getXYMessage(direction)
    }
    if (direction === "down" && this.getXY().roundedY !== 3) {
      this.setState((prevState) => {
        return {index: prevState.index + 3, steps: prevState.steps + 1}
      })
    } else {
      this.getXYMessage(direction)
    }
    if (direction === "right" && this.getXY().x !== 3) {
      this.setState((prevState) => {
        return {index: prevState.index + 1, steps: prevState.steps + 1}
      })
    } else {
      this.getXYMessage(direction)
    }
    if (direction === "up" && this.getXY().roundedY !== 1) {
      this.setState((prevState) => {
        return {index: prevState.index - 3, steps: prevState.steps + 1}
      })
    } else {
      this.getXYMessage(direction)
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    let direction = evt

    this.getNextIndex(direction)
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    evt.preventDefault()
    this.setState({email: evt.target.value})
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    axios.post("http://localhost:9000/api/result", {
      "x": this.getXY().x,
      "y": this.getXY().roundedY,
      "steps": this.state.steps,
      "email": this.state.email
    })
    .then(res => {
      // console.log(res)
      this.setState({email: initialState.email})
      this.setState({message: res.data.message})
    })
    .then(res => {
      this.setState({email: ""})
    })
    .catch(err => {
      // console.log(err)
      this.setState({message: err.response.data.message})
    })
  }
  stepsMessage = () => {
    if (this.state.steps == 0) {
      return "times"
    } else if (this.state.steps == 1) {
      return "time"
    } else {
      return "times"
    }
  }
  render() {
    this.getXY()
    // console.log(this.state)
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.getXY().x}, {this.getXY().roundedY})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.stepsMessage()}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => {this.move("left")}} id="left">LEFT</button>
          <button onClick={() => {this.move("up")}} id="up">UP</button>
          <button onClick={() => {this.move("right")}} id="right">RIGHT</button>
          <button onClick={() => {this.move("down")}} id="down">DOWN</button>
          <button onClick={() => {this.reset()}} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
