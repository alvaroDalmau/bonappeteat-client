import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

export default class ActiveBooks extends Component {
  state = {
    bookings: [],
    fetching: true,
  };

  componentDidMount() {
    //grabbing bookings info of each user
    axios
      .get(`${config.API_URL}/api/bookings`, { withCredentials: true })
      .then(bookings => {
        this.setState({
          bookings: bookings.data,
          fetching: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeDate = e => {
    return e.replace('T', ' ').slice(0, 16);
  };

  render() {
    const { bookings,fetching } = this.state;
    if (fetching) {
      return (
        <div className="spinner-grow text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    return (
      <React.Fragment>
        {bookings.map((e, i) => {
          return (
            <div key={i}>
              <h4>Restaurant:{e.restaurant.name}</h4>
              <h4>Date:{this.changeDate(e.dateTime)}</h4>
              <h4>People:{e.pax}</h4>
              <button>Edit your booking</button>
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
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
