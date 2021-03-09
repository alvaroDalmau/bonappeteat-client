import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class FormBooking extends Component {

  render() {
    return (
      <React.Fragment>
        <form onSubmit= {this.props.handleSubmit}>
          <label>Choose the day and time:</label>
          <input name='dateTime' type="datetime-local"></input>
          <br />
          <label>Pax:</label>
          <input name='pax' type="number" placeholder="pax" min="0" max="10"></input>
          <br />
          <button type='submit'>Apply changes</button>
        </form>
      </React.Fragment>
    );
  }
}
export default withRouter(FormBooking)