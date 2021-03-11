import React, { Component } from 'react'

import { withRouter } from "react-router-dom";

class FormBooking extends Component {
  
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.props.handleSubmit}>
          <label>Choose the day:</label>
          <input type="date"></input>
          <br />
          <label>Hour:</label>
          <select>
            <option disabled="disabled"> </option>
            <option disabled="disabled">---Lunch---</option>
            <option>12:30-13:30</option>
            <option>13:30-14:30</option>
            <option>14:30-15:30</option>
            <option disabled="disabled">---Dinner---</option>
            <option>19:30-20:30</option>
            <option>20:30-21:30</option>
            <option>21:30-22:30</option>
          </select>
          <br />
          <label>Pax:</label>
          <input
            name="pax"
            type="number"
            placeholder="pax"
            min="0"
            max="10"
          ></input>
          <br />
          <button type="submit">Apply changes</button>
        </form>
      </React.Fragment>
    );
  }
}
export default withRouter(FormBooking)