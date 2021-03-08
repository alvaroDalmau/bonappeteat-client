import React, { Component } from 'react'
import axios from "axios";
import config from "../config.js";
import { withRouter } from "react-router-dom";

class FormBooking extends Component {
  state = {
    bookings: []
  };

  handleSubmit=(event)=>{
    event.preventDefault()
    let user = event.target.user.value;
    let restaurant= event.target.restaurant.value;
    let time = event.target.time.value
    let date= event.target.date.value
    let pax= event.target.pax.value

        axios.post(`${config.API_URL}/api/create`, {
            user: user,
            restaurant: restaurant,
            time: time,
            date: date,
            pax: pax
        })
            .then((response) => {
                this.setState({
                  bookings: [response.data, ...this.state.bookings]
                }, () => {
                  this.props.history.push('/')
                })

            })
            .catch((err) => {
              console.log('Bookings creation failed', err)
            })
          
  }
  
  render() {
    return (
      <React.Fragment>
        <form onSubmit= {this.handleSubmit}>
          <label>Email:</label>
          {/* populate user */}
          <input type="email" placeholder="email"></input>
          <br />
          <label>Restaurant:</label>
          {/* populate restaurant */}
          <input type="text" placeholder="email"></input>
          <br />
          <label>Choose the day:</label>
          <input type="date"></input>
          <br />
          <label>Hour:</label>
          <input type="time" placeholder="pax"></input>
          <br />
          {/* <label>Choose the day and time:</label>
              <input type="datetime-local"></input> */}
              <br />
          <label>Pax:</label>
          <input type="number" placeholder="pax" min="0" max="10"></input>
          <br />
          <button>Apply changes</button>
        </form>
      </React.Fragment>
    );
  }
}
export default withRouter(FormBooking)